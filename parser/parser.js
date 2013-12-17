define ([
    'require',
    'dojo/_base/config',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/has',
    'dojo/Deferred',
    'dojo/DeferredList',
    '../string',
    '../config/ready!',
    'dojo/sniff'
],
function (
    require,
    dojoConfig,
    declare,
    array,
    has,
    Deferred,
    DeferredList,
    string
) {
    // module:
    //		havok/parser
    //
    // summary:
    //      Parses HTML looking for widgets

    /*=====
    var __Options = {
        // startup: Boolean
        //      Should `.startup()` be called on any created widgets?
        //      Defaults to `true`.
        // contextRequire: function
        //      Context to resolve relative requires.
        //      Defaults to the context of this module
    };
    =====*/

    var mixinsAttr = 'data-dojo-mixins',
        typeAttr = 'data-dojo-type',
        prefixes = ['data-havok-', 'data-'],
        ignoreParams = [
            typeAttr,
            mixinsAttr,
            'data-dojo-props'
        ],

        _createInstance = function(refNode, contextRequire){

            var result = new Deferred,
                type,
                requires,
                attributes,
                i;

            if (refNode.hasAttribute(typeAttr)){
                type = refNode.getAttribute(typeAttr);
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

            for (i in dojoConfig.parser.mixins){
                if (refNode.hasAttribute(i)){
                    requires.push(dojoConfig.parser.mixins[i]);
                }
            }

            if (refNode.hasAttribute(mixinsAttr)){
                array.forEach(refNode.getAttribute(mixinsAttr).split(' '), function(mixin){
                    if (dojoConfig.parser.mixins[mixin]) {
                        requires.push(dojoConfig.parser.mixins[mixin]);
                    } else {
                        requires.push(mixin);
                    }
                })
            }

            contextRequire(requires, function(){
                var Module = arguments[0],
                    params = {},
                    item,
                    instance;

                if (arguments.length > 1){
                    Module = declare(Array.prototype.slice.call(arguments, 0), {});
                }

                i = 0;
                while(item = attributes[i++]){
                    var name = item.name,
                        value = item.value;

                    if (ignoreParams.indexOf(name) != -1){
                        continue;
                    }

                    array.forEach(prefixes, function(prefix){
                        if (name.indexOf(prefix) == 0){
                            name = name.slice(prefix.length);
                        }
                    });

                    name = string.camelCase(name);

                    // Set params[name] to value, doing type conversion
                    if(name in Module.prototype){
                        switch(typeof Module.prototype[name]){
                        case 'number':
                            params[name] = value.length ? Number(value) : NaN;
                            break;
                        case 'boolean':
                            // for checked/disabled value might be "" or "checked".	 interpret as true.
                            params[name] = value.toLowerCase() != "false";
                            break;
                        default:
                            params[name] = value;
                        }
                    } else {
                        params[name] = value;
                    }
                }

                instance = new Module(params, refNode);

                if(!has("host-browser") && instance.domNode){
                    //make sure the type attribute is set if using server side
                    //templating so that the widget can be parsed in the browser
                    instance.domNode.setAttribute('data-dojo-type', requires[0]);
                    if (requires.length > 0){
                        instance.domNode.setAttribute('data-dojo-mixins', requires.slice(1));
                    }
                    this.domNode.setAttribute('data-havok-_rendered', true);
                }

                result.resolve(instance);
            });

            return result;
        };

    return {

        parse: function(/*DomNode?*/root, /*__Options?*/options){

            var result = new Deferred,
                instanceDefs = [],
                instanceDefList,
                tag,
                node,
                nodes,
                i;

            if (!options) options = {};
            if (options.startup == undefined) options.startup = true;
            if (!options.contextRequire) options.contextRequire = require;

            root = root ? root : document.body;

            nodes = root.querySelectorAll('[' + typeAttr + ']');
            for (i = 0; i < nodes.length; i++){
                instanceDefs.push(_createInstance(nodes[i], options.contextRequire));
            }

            for (tag in dojoConfig.parser.tags) {

                //getElementsByTagName returns a live list, so it needs to be cached first
                nodes = [];
                array.forEach(root.getElementsByTagName(tag), function(node){
                    nodes.push(node);
                });
                array.forEach(nodes, function(node){
                    instanceDefs.push(_createInstance(node, options.contextRequire));
                })
            }

            if (instanceDefs.length == 0){
                result.resolve();
                return result;
            }

            instanceDefList = new DeferredList(instanceDefs);
            instanceDefList.then(function(list){
                var widgets = array.map(list, function(item){
                    return item[1];
                });

                if (options.startup){
                    array.forEach(widgets, function(item){
                        if (item.startup) item.startup();
                    })
                }
                result.resolve(widgets);
            })

            return result;
        }
    }
});