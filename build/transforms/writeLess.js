define([
    "build/buildControl",
    "build/fileUtils",
    "build/fs",
    "dojo/has",
    "build/transforms/writeAmd"
], function(bc, fileUtils, fs, has, writeAmd){

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
            rawLessFilename,
            importOption,
            pieces,
            moduleSet = writeAmd.computeLayerContents(resource, resource.layer.include, resource.layer.exclude);

        for (i in moduleSet){
            if (!moduleSet[i].less) {
                continue;
            }
            hasLess = true;
            for (j in moduleSet[i].less) {
                module = moduleSet[i].less[j];
                if (module.lessConfig.defs){
                    defsLess.push(module);
                } else {
                    while (ranksLess.length - 1 < module.lessConfig.rank){
                        ranksLess.push([]);
                    }
                    ranksLess[module.lessConfig.rank].push(module);
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
        if (bc.less){
            for (i in bc.less){
                var moduleInfo = bc.getSrcModuleInfo(i, null, true);
                module = bc.resources[moduleInfo.url];

                if (bc.less[i].defs){ //defs are added to every layer
                    var alreadyAdded = false;

                    for (j = 0; j < defsLess.length; j++){
                        if (defsLess[j].module.src == module.src){
                            alreadyAdded = true;
                            break;
                        }
                    }
                    if (!alreadyAdded){
                        defsLess.push({module: module, lessConfig: bc.less[i]});
                    }
                } else if (resource.layer.boot) {
                    while (ranksLess.length - 1 < bc.less[i].rank){
                        ranksLess.push([]);
                    }
                    ranksLess[bc.less[i].rank].push({module: module, lessConfig: bc.less[i]});
                }
            }
        }

        for(i = 0; i < defsLess.length; i++){
            importOption = defsLess[i].lessConfig.importOption ? '(' + defsLess[i].lessConfig.importOption + ') ' : '';
            rawLess.push("@import " + importOption + "'" + getRelativePath(defsLess[i].module.dest, resource.dest) + "';");
        }
        for (i = 0; i < ranksLess.length; i++){
            for (j = 0; j < ranksLess[i].length; j++){
                importOption = ranksLess[i][j].lessConfig.importOption ? '(' + ranksLess[i][j].lessConfig.importOption + ') ' : '';
                rawLess.push("@import " + importOption + "'" + getRelativePath(ranksLess[i][j].module.dest, resource.dest) + "';");
            }
        }

        rawLess = rawLess.join('\n');

        pieces = resource.dest.split('.');
        pieces.pop();
        rawLessFilename = pieces.join('.') + '.less';

        fileUtils.ensureDirectoryByFilename(rawLessFilename);
        fs.writeFile(rawLessFilename, bc.newlineFilter(rawLess, resource, "writeAmd"), resource.encoding, function(err){

            callback(resource, err);
            return;
        });
    };
});

