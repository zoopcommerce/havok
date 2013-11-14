define ([
    'dojo/_base/config',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/has',
    'dojo/dom-attr',
    'dojo/Deferred',
    'dojo/DeferredList',
    '../string',
    'dojo/domReady!',
    '../config/ready!',
    'dojo/sniff'
],
function (
    dojoConfig,
    declare,
    array,
    has,
    domAttr,
    Deferred,
    DeferredList,
    string
) {
    // module:
    //		havok/parser
    //
    // summary:
    //      Parses HTML looking for custom tags
    //

    var mixinsAttr = 'mixins',
        typeAttr = 'data-dojo-type',
        ignoreParams = [
            string.camelCase(typeAttr),
            string.camelCase(mixinsAttr)
        ],

        _createInstance = function(refNode){

            var result = new Deferred,
                type,
                requires,
                attributes;

            if (domAttr.has(refNode, typeAttr)){
                type = domAttr.get(refNode, typeAttr);
            } else {
                type = dojoConfig.parser.tags[refNode.tagName.toLowerCase()];
            }
            requires = [type];

            if(has("dom-attributes-explicit")){
                // Standard path to get list of user specified attributes
                attributes = refNode.attributes;
            }else if(has("dom-attributes-specified-flag")){
                // Special processing needed for IE8, to skip a few faux values in attributes[]
                attributes = array.filter(refNode.attributes, function(a){
                    return a.specified;
                });
            }

            if (domAttr.has(refNode, mixinsAttr)){
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
                    item,
                    instance;

                if (arguments.length > 1){
                    Module = declare(Array.prototype.slice.call(arguments, 0), {});
                }

                i = 0;
                while(item = attributes[i++]){
                    var name = string.camelCase(item.name),
                        value = item.value;
                    if (ignoreParams.indexOf(name) == -1){
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
                            }
                        } else {
                            params[name] = value;
                        }
                    }
                }

                instance = new Module(params, refNode);
                domAttr.set(instance.domNode, typeAttr, type);
                result.resolve(instance);
            });

            return result;
        };

    return {

        parse: function(root){

            var result = new Deferred,
                instanceDefs = [],
                instanceDefList,
                tag,
                node,
                nodes,
                i;

            root = root ? root : document.body;

            nodes = root.querySelectorAll('[' + typeAttr + ']');
            for (i = 0; i < nodes.length; i++){
                instanceDefs.push(_createInstance(nodes[i]));
            }

            for (tag in dojoConfig.parser.tags) {

                //getElementsByTagName returns a live list, so it needs to be cached first
                nodes = [];
                array.forEach(root.getElementsByTagName(tag), function(node){
                    nodes.push(node);
                });
                array.forEach(nodes, function(node){
                    instanceDefs.push(_createInstance(node));
                })
            }

            if (instanceDefs.length == 0){
                result.resolve();
                return result;
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