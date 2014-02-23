var lessc = require('less');
var fs = require('fs');
var path = require('path');
var readProfile = require('./readProfile');

complieLess = function(profile, callback){

    var count = 0;
    var start = function(){
        count++;
    };
    var end = function(){
        count--;
        if (count == 0){
            callback(null, profile);
        }
    };

    //parse and compress layer less
    var i,
        basePath,
        rawLessFilename,
        rawCssFilename,
        optCssFilename;

    start();
    for (i in profile.layers){
        basePath = path.dirname(profile.selfPath) + '/' + profile.releaseDir + '/' + i;
        rawLessFilename = basePath + '.less';
        start();
        fs.stat(rawLessFilename, function(err){
            if (err) {
                end();
            } else {
                if (profile.layerOptimize){
                    rawCssFilename = basePath + '.uncompressed.css';
                    optCssFilename = basePath + '.css';
                } else {
                    rawCssFilename = basePath + '.css';
                }

                fs.readFile(rawLessFilename, 'utf8', function(err, data){
                    if (err) {callback(err); return;}

                    //parse the less into css
                    var parser = new lessc.Parser({
                            relativeUrls: true,
                            paths: [path.dirname(rawLessFilename), path.dirname(rawLessFilename) + '/../'],
                            filename: path.basename(rawLessFilename)
                        }),
                        rawCss,
                        optCss;

                    parser.parse(data, function(err, root){
                        if (err) {callback(err); return;}
                        rawCss = root.toCSS({compress: false, strictMaths: false, strictUnits: false});
                        fs.writeFile(rawCssFilename, rawCss, function(err){
                            if (err) {callback(err); return;}
                            if (profile.layerOptimize){
                                optCss = root.toCSS({compress: true, strictMaths: false, strictUnits: false});
                                fs.writeFile(optCssFilename, optCss, function(err){
                                    if (err) {callback(err); return;}
                                    end();
                                })
                            } else {
                                end();
                            }
                        })
                    })
                })
            }
        })
    }
    end();
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        complieLess(profile, function(err){
            if (err) throw err
        });
    })
} else {
    exports.process = complieLess
}

