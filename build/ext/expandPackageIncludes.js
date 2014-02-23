require('../nodeconfig');
var fs = require('fs');
var path = require('path');
var util = require('util');
var dive = require('dive');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

expandPackageIncludes = function(profile, callback){
    //process layers which include whole pacakges with "package/*" syntax
    var layer,
        i,
        j,
        k,
        packageName,
        packagePath,
        tagger,
        mids;

    for (i in profile.layers){
        layer = profile.layers[i];
        if (layer.include){
            for(j = 0; j < layer.include.length; j++){
                if (/\/\*$/.test(layer.include[j])) {
                    packageName = layer.include[j].substr(0, layer.include[j].indexOf('/'));
                    for (k = 0; k < dojoConfig.packages.length; k++){
                        if (dojoConfig.packages[k].name == packageName){
                            packagePath = path.normalize(dojoConfig.packages[k].location);
                            break;
                        }
                    }
                    fs.readFile(packagePath + '/package.json', function(err, data){

                        if (err) {callback(err); return;}
                        fs.readFile(packagePath + '/' + JSON.parse(data).dojoBuild, function(err, data){
                            if (err) {callback(err); return;}
                            tagger = (new Function([], data + '; return profile;'))().resourceTags;

                            mids = [];
                            dive(
                                packagePath,
                                function(err, file){
                                    if (err) {callback(err); return;}
                                    var mid = packageName + '/' + file.replace(packagePath, '').slice(1, -3).replace(/\\/g, '/');
                                    if (tagger.amd(file, mid) && !tagger.miniExclude(file, mid)){
                                        mids.push(mid);
                                        console.log('include ' + mid);
                                    }
                                },
                                function(){
                                    layer.include.splice.apply(layer.include, [j-1, 1].concat(mids));
                                    callback(null, profile);
                                }
                            );
                        })
                    })
                }
            }
        }
    }
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        expandPackageIncludes(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = expandPackageIncludes
}
