less = {async: true};

define([
    'dojo/json',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dojo/dom-construct',
    'dojo/_base/config',
    './vendor/less/less',
    './config/ready!'
],
function(
    json,
    Deferred,
    DeferredList,
    domConstruct,
    dojoConfig,
    lessc
){
    // module:
    //		havok/less
    //
    // An AMD plugin that loads and parses less

    var i,
        config = dojoConfig.less,
        styleNodes = [],
        parser = new lessc.Parser(),
        basePath = dojoConfig.baseUrl + '..',
        extraVariables = [],
        initalLoad = new Deferred,
        deferredParse,
        deferredParseAlways,
        deferredIncludeAlwaysRoot = new Deferred,
        includeAlwaysRoot,
        parseLess = function(item, useIncludeAlways){
            var result = new Deferred;
            parser.parse(item.less, function(err, root) {
                if (useIncludeAlways){
                    deferredIncludeAlwaysRoot.then(function(){
                        root.rules = root.rules.concat(includeAlwaysRoot.rules);
                        item.root = root;
                        result.resolve();
                    })
                    return;
                }
                item.root = root;
                result.resolve();
            });

            return result;
        },
        toCss = function(item){
            item.css = item.root.toCSS({compress: true, strictMaths: false, strictUnits: false});
        },
        injectCss = function(item){
            if (!item.block){
                item.block = 2;
            }
            while (styleNodes.length - 1 < item.block){
                styleNodes.push(domConstruct.create('style', null, document.head));
            }
            styleNodes[item.block].innerHTML = styleNodes[item.block].innerHTML + item.css;
        },
        requires = [],
        keys = [],
        parseAlwaysDefereds = [],
        parseDefereds = [];

    for (i in config){
        keys.push(i);
        requires.push('dojo/text!' + i);
    }

    require(requires, function(){
        for (i = 0; i < arguments.length; i++){
            config[keys[i]].less = arguments[i];
        }

        //add corrections to some paths
        extraVariables.push('@basePath: "' + basePath + '";\n');
        extraVariables.push('@FontAwesomePath: "' + basePath + '/havok/vendor/font-awesome/font";\n');
        config['extraVariables'] = {includeAlways: true, less: extraVariables.join('\n')};

        //parse loaded less
        for (i in config){
            if (config[i].includeAlways){
                parseAlwaysDefereds.push(parseLess(config[i]));
            }
        }

        deferredParseAlways = new DeferredList(parseAlwaysDefereds);
        deferredParseAlways.then(function(){
            for (i in config){
                if (config[i].includeAlways){
                    if (!includeAlwaysRoot){
                        includeAlwaysRoot = config[i].root;
                    } else {
                        includeAlwaysRoot.rules = includeAlwaysRoot.rules.concat(config[i].root.rules);
                    }
                }
            }
            deferredIncludeAlwaysRoot.resolve();
            for (i in config){
                if (!config[i].includeAlways && !config[i].dynamic){
                    parseDefereds.push(parseLess(config[i], true));
                }
            }
            deferredParse = new DeferredList(parseDefereds);
        })

        deferredParse.then(function(){
            for (i in config){
                if (!config[i].includeAlways && !config[i].dynamic){
                    toCss(config[i]);
                    injectCss(config[i]);
                }
            }
            initalLoad.resolve();
        })
    });

    return {
        load: function(id, require, callback){

            var item,
                pieces = id.split('!'),
                mid = pieces[0];

            if (pieces.length > 1){
                item = json.parse(id, true);
            } else {
                item = {block: 2};
            }
            item.dynamic = true;

            if (config[mid]){
                //already processed
                return;
            }

            config[id] = item;

            if (item.css){
                injectCss(item);
                callback(item.css);
                return;
            }

            if (item.less){
                parseLess(item, true).then(function(){
                    toCss(item);
                    injectCss(item);
                    callback(item.css);
                });
                return;
            }

            require(['dojo/text!' + id], function(less){
                item.less = less;
                parseLess(item, true).then(function(){
                    toCss(item);
                    injectCss(item);
                    callback(item.css);
                });
                return;
            })
        }
    };
});
