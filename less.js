less = {async: true};

define([
    'dojo/json',
    'dojo/when',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dojo/dom-construct',
    'dojo/_base/config',
    './config/ready!'
],
function(
    json,
    when,
    Deferred,
    DeferredList,
    domConstruct,
    dojoConfig
){
    // module:
    //		havok/less
    //
    // An AMD plugin that loads and parses less

    var i, //iteration pointer
        config = dojoConfig.less, //less configuration array from dojoConfig
        styleNodes = [], //array of <style> nodes that have been added to document <head>
        parser, //variable to hold an instance of the less parser, if one is required
        initalLoad = new Deferred, //resolves when the inital load is complete
        deferredParse,  //resoves when all the inital less files have been parsed
        defRoot, //the parsed token tree of all less marked with {defs: true}
        deferredDefsRoot = new Deferred, //resolves when defRoot has been populated

        rewriteImports = function(fileName, less){
            //rewrites @import so that relative paths work
            //In particular this allows the definition less to be parsed just once,
            //greatly speeding up load time during development

            var basePath = dojoConfig.baseUrl + '../',
                filePieces = fileName.split('/'),
                filePath;

            filePieces.pop();
            filePath = basePath + filePieces.join('/');

            return less.replace(/@import .*;/g, function(match){
                var pieces = match.indexOf('"') == -1 ? match.split("'") : match.split('"');

                pieces[1] = filePath + '/' + pieces[1];
                return pieces.join("'");
            });
        },

        getParser = function(){
            //creates a parser
            if (parser){
                return parser;
            }
            var deferredGetParser = new Deferred;
            require(['havok/vendor/less/dist/less'], function(lessc){
                parser = new lessc.Parser();
                deferredGetParser.resolve(parser);
            })
            return deferredGetParser;
        },

        parseLess = function(item, useDefs){
            //function parses less into a token tree
            var result = new Deferred;

            when(getParser(), function(parser){
                parser.parse(item.less, function(err, root) {
                    if (useDefs){
                        deferredDefsRoot.then(function(){
                            root.rules = root.rules.concat(defRoot.rules); //add the defs so undefined definition errors don't occur
                            item.root = root;
                            result.resolve();
                        })
                        return;
                    }
                    item.root = root;
                    result.resolve();
                });
            })

            return result;
        },

        toCss = function(item){
            //function turns a token tree into css
            item.css = item.root.toCSS({compress: true, strictMaths: false, strictUnits: false});
        },

        injectCss = function(item){
            //function injects some css into the document
            if (!item.rank){
                item.rank = 2;
            }
            while (styleNodes.length - 1 < item.rank){
                styleNodes.push(domConstruct.create('style', null, document.head));
            }
            styleNodes[item.rank].innerHTML = styleNodes[item.rank].innerHTML + item.css;
        },

        requires = [], //an array of less files that will be required using dojo/text!
        requireOrder = []; //an array of less config keys so the requires can be loaded and matched to the correct config.

    for (i in config){
        requireOrder.push(i);
        requires.push('dojo/text!' + i);
    }

    require(requires, function(){
        var fileType,
            injectRequired = false;

        for (i = 0; i < arguments.length; i++){
            fileType = requireOrder[i].split('.').pop();
            if (fileType != 'less' && fileType != 'css'){
                throw new Error('Unknown filetype. Should be less or css. Got ' + requireOrder[i]);
            }
            config[requireOrder[i]][fileType] = arguments[i];
            if (arguments[i] == '//skip'){
                config[requireOrder[i]].skip = true;
            } else {
                if (fileType == 'less'){
                    config[requireOrder[i]][fileType] = rewriteImports(requireOrder[i], arguments[i]);
                }
                injectRequired = true;
            }
        }

        if (!injectRequired){
            initalLoad.resolve();
            return;
        }

        //now parse the loaded less

        //first parse all the less marked as {defs: true}
        var parseDefsDeferreds = []
        for (i in config){
            if (config[i].defs){
                parseDefsDeferreds.push(parseLess(config[i]));
            }
        }

        //this DeferredList will resolve when all less marked as {defs: true} has been parsed into a token tree
        var deferredParseDefs = new DeferredList(parseDefsDeferreds);
        deferredParseDefs.then(function(){
            //now combine all the {defs: true} token trees into a single token tree
            for (i in config){
                if (config[i].defs){
                    if (!defRoot){
                        //create the root defs token tree
                        defRoot = config[i].root;
                    } else {
                        defRoot.rules = defRoot.rules.concat(config[i].root.rules);
                    }
                }
            }
            deferredDefsRoot.resolve(); //the token tree for defs is now complete. Yay!

            //now we can parse all the 'normal' less - ie the less that isn't markes as containing defs
            var parseDeferreds = [];
            for (i in config){
                if (!config[i].defs && !config[i].css && !config[i].dynamic){ //the !dynamic bit is added here so that any less requested through AMD plugins isn't loaded till later
                    parseDeferreds.push(parseLess(config[i], true));
                }
            }
            deferredParse = new DeferredList(parseDeferreds);

            deferredParse.then(function(){
                //with all the parsing done, the token trees can now be transformed into css and injected
                for (i in config){
                    if (!config[i].defs && !config[i].dynamic){
                        if (!config[i].css){
                            toCss(config[i]);
                        }
                        injectCss(config[i]);
                    }
                }
                initalLoad.resolve(); //the inital load is complete!
            })
        })
    });

    return {
        load: function(id, require, callback){

            //this is the callback executed by the plugin

            if (dojoConfig.less === false) {
                //dynamic less loading is turnned off. Do nothing.
                callback();
                return;
            }
            
            var item,
                pieces = id.split('!'),
                mid = pieces[0];

            if (pieces.length > 1){
                item = json.parse(pieces[1], true);
            } else {
                item = {rank: 2};
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

            require(['dojo/text!' + id], function(styles){

                var fileType = id.split('.').pop();
                if (fileType != 'less' && fileType != 'css'){
                    throw new Error('Unknown filetype. Should be less or css. Got ' + requireOrder[i]);
                }

                item[fileType] = styles;

                if (styles == '//skip'){
                    item.skip = true;
                    callback();
                    return;
                }

                if (item.css){
                    injectCss(item);
                } else {
                    item.less = rewriteImports(id, item.less);
                    parseLess(item, true).then(function(){
                        toCss(item);
                        injectCss(item);
                        callback(item.css);
                    });
                }

                return;
            })
        }
    };
});
