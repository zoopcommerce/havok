define ([
    'dojo/_base/config',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/has',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/Deferred',
    'dojo/DeferredList'
],
function (
    dojoConfig,
    declare,
    array,
    has,
    query,
    domAttr,
    Deferred,
    DeferredList
) {
    // module:
    //		havok/parser
    //
    // summary:
    //      Parses HTML looking for custom tags
    //

    var mixinsAttr = 'mixins';

    return {

        parse: function(root){
            var result = new Deferred,
                instanceDefs = [],
                instanceDefList,
                tag;

            root = root ? root : document.body;

            for (tag in dojoConfig.parser.tags) {
                query(tag, root).forEach(function(refNode){
                    var instanceDef = new Deferred,
                        requires = [dojoConfig.parser.tags[tag]],
                        attributes;

                    if(has("dom-attributes-explicit")){
                        // Standard path to get list of user specified attributes
                        attributes = refNode.attributes;
                    }else if(has("dom-attributes-specified-flag")){
                        // Special processing needed for IE8, to skip a few faux values in attributes[]
                        attributes = array.filter(refNode.attributes, function(a){
                            return a.specified;
                        });
                    }

                    instanceDefs.push(instanceDef);
                    if (domAttr.has(refNode, mixinsAttr)){
                        attributes
                        array.forEach(domAttr.get(refNode, mixinsAttr).split(' '), function(mixin){
                            if (dojoConfig.parser.mixins[mixin]) {
                                requires.push(dojoConfig.parser.mixins[mixin]);
                            } else {
                                requires.push(mixin);
                            }
                        })
                    }
                    require(requires, function(){
                        var Module = arguments[0],
                            i,
                            params = {},
                            item;

                        if (arguments.length > 1){
                            Module = declare(Array.prototype.slice.call(arguments, 0), {});
                        }

                        i = 0;
                        while(item = attributes[i++]){
                            var name = item.name.replace(/-([a-z])/gi, function(s, group1) {
                                    return group1.toUpperCase();
                                }),
                                value = item.value;
                            switch (name) {
                                case mixinsAttr:
                                    break;
                                default:
                                    // Set params[name] to value, doing type conversion
                                    if(name in Module.prototype){
                                        switch(typeof Module.prototype[name]){
                                        case 'string':
                                            params[name] = value;
                                            break;
                                        case 'number':
                                            params[name] = value.length ? Number(value) : NaN;
                                            break;
                                        case 'boolean':
                                            // for checked/disabled value might be "" or "checked".	 interpret as true.
                                            params[name] = value.toLowerCase() != "false";
                                            break;
                                        case 'object':
                                            params[name] = JSON.parse(value);
                                            break;
                                        }
                                    } else {
                                        params[name] = value;
                                    }
                            }
                        }

                        instanceDef.resolve(new Module(params, refNode));
                    });
                })
            }

            instanceDefList = new DeferredList(instanceDefs);
            instanceDefList.then(function(list){
                array.forEach(list, function(item){
                    if (item[1].startup){
                        item[1].startup();
                    }
                });
                result.resolve();
            })

            return result;
        }
    }
});