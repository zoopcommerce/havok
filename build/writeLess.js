define([
	"build/buildControl",
	"build/fileUtils",
	"build/fs"
], function(bc, fileUtils, fs){

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
            module,
            hasLess = false,
            defsLess = [],
            ranksLess = [],
            rawLess,
            rawLessFilename,
            rawCssFilename,
            optCssFilename,
            pieces;

        for (i in resource.moduleSet){
            module = resource.moduleSet[i];
            if (module.lessConfig){
                hasLess = true;
                if (module.lessConfig.defs){
                    defsLess.push("@import '" + module.module.src + "';");
                } else {
                    while (ranksLess.length - 1 < module.lessConfig.rank){
                        ranksLess.push([]);
                    }
                    ranksLess[module.lessConfig.rank].push("@import '" + module.module.src + "';");
                }
            }
        }

        if (!hasLess){
            //there isn't any less or css to compile
            callback(resource, err);
            return;
        }

        pieces = resource.dest.split('.');
        pieces.pop();

        rawLess = defsLess.join('\n');
        for (i = 0; i < ranksLess.length; i++){
            rawLess = rawLess + '\n' + ranksLess[i].join('\n');
        }
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
            parser.parse(rawLess, function(err, root){
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

