define([
	"build/buildControl",
	"build/fileUtils",
	"build/fs",
	"dojo/has",
    "dojo/_base/config"
], function(bc, fileUtils, fs, has, dojoConfig){

   var getRelativePath = function(lessDest, layerDest){

       var delimiter = has('is-windows') ? '/' : '\\',
		   re = new RegExp('[\\\\/]+'),
           lessPieces = lessDest.split(re),
           layerPieces = layerDest.split(re),
           lessFilename = lessPieces.pop();

       layerPieces.pop();

       while (lessPieces[0] == layerPieces[0]){
           lessPieces.shift();
           layerPieces.shift();
       }

       while (layerPieces.length > 0){
           lessPieces.unshift('..' + delimiter);
		   layerPieces.pop();
       }
       lessPieces.push(lessFilename);

       return fileUtils.compactPath(lessPieces.join(delimiter));
   };

   return function(
        resource,
        callback,
        err
    ){
        if (!resource.layer || resource.layer.discard){
            //not a layer, nothing to do
            callback(resource, err);
            return;
        }

        var i,
            j,
            module,
            hasLess = false,
            defsLess = [],
            ranksLess = [],
            rawLess = [],
            toCompileLess = [],
            rawLessFilename,
            rawCssFilename,
            optCssFilename,
            pieces;

        for (i in resource.moduleSet){
            module = resource.moduleSet[i];
            if (module.lessConfig){
                hasLess = true;
                if (module.lessConfig.defs){
                    defsLess.push(module.module);
                } else {
                    while (ranksLess.length - 1 < module.lessConfig.rank){
                        ranksLess.push([]);
                    }
                    ranksLess[module.lessConfig.rank].push(module.module);
                }
            }
        }

        if (!hasLess){
            //there isn't any less or css to compile
            callback(resource, err);
            return;
        }

		//make sure that defs in config are always included.
		//less compile will probably fail if they are not
		if (bc.defaultConfig.less){
			for (i in bc.defaultConfig.less){
				moduleInfo = bc.getSrcModuleInfo(i, null, true);
				module = bc.resources[moduleInfo.url];

                if (bc.defaultConfig.less[i].defs){ //defs are added to every layer
                    defsLess.push(module); 
                }
			}
		}
				
        pieces = resource.dest.split('.');
        pieces.pop();

        //add a tiny bit of extra less to enable correct paths.
        var basePath = dojoConfig.baseUrl + '..';
		
        toCompileLess.push('@basePath: "' + basePath + '";\n');
        rawLess.push('@basePath: "' + getRelativePath(basePath + '/dummy', resource.src).slice(0, -6) + '";\n');
        
        for(i = 0; i < defsLess.length; i++){
            toCompileLess.push("@import '" + defsLess[i].src + "';");
            rawLess.push("@import '" + getRelativePath(defsLess[i].dest, resource.dest) + "';");
        }
        for (i = 0; i < ranksLess.length; i++){
            for (j = 0; j < ranksLess[i].length; j++){
                toCompileLess.push("@import '" + ranksLess[i][j].src + "';");
                rawLess.push("@import '" + getRelativePath(ranksLess[i][j].dest, resource.dest) + "';");
            }
        }

        toCompileLess = toCompileLess.join('\n');
        rawLess = rawLess.join('\n');

        rawLessFilename = pieces.join('.') + '.less';
        if (bc.layerOptimize){
            rawCssFilename = pieces.join('.') + '.uncompressed.css';
            optCssFilename = pieces.join('.') + '.css';
        } else {
            rawCssFilename = pieces.join('.') + '.css';
        }

        fileUtils.ensureDirectoryByFilename(rawLessFilename);
        fs.writeFile(rawLessFilename, bc.newlineFilter(rawLess, resource, "writeAmd"), resource.encoding, function(err){

            if (err){
                callback(resource, err);
                return;
            }

            //parse the less into css
            //note: the lessc global is defined in the buildconfig.js
            var parser = new lessc.Parser({
                    filenmae: rawLessFilename
                }),
                rawCss,
                optCss;
            parser.parse(toCompileLess, function(err, root){
                if (err){
                    callback(resource, err);
                    return;
                }
                rawCss = root.toCSS({compress: false, strictMaths: false, strictUnits: false});
                fs.writeFile(rawCssFilename, bc.newlineFilter(rawCss, resource, "writeAmd"), resource.encoding, function(err){
                    if (err){
                        callback(resource, err);
                        return;
                    }
                    if (bc.layerOptimize){
                        optCss = root.toCSS({compress: true, strictMaths: false, strictUnits: false});
                        fs.writeFile(optCssFilename, bc.newlineFilter(optCss, resource, "writeAmd"), resource.encoding, function(err){
                            callback(resource, err);
                        })
                    } else {
                        callback(resource, err);
                    }
                })
            })
        });
    };
});

