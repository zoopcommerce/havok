var fs = require('fs');
var path = require('path');
var util = require('util');
var dive = require('dive');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');
var message = 'Expanding layer includes with "package/* syntax';

expandSingle = function(layer, include, profile, callback){

    var i,
        packagePath,
        packageName = include.substr(0, include.indexOf('/')),
        tagger,
        mids;

    for (i = 0; i < profile.packages.length; i++){
        if (profile.packages[i].name == packageName){
            packagePath = path.normalize(profile.basePath + '/' + profile.packages[i].location);
            break;
        }
    }

    if (!packagePath){
        callback('Cannot expand ' + include + ' because package ' + packageName + ' is not part of the build profile');
    }

    fs.readFile(packagePath  + '/package.json', function(err, data){
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
                        console.log('LOG   Include ' + mid);
                    }
                },
                function(){
                    layer.include.splice.apply(layer.include, [layer.include.indexOf(include), 1].concat(mids));
                    callback();
                }
            );
        })
    })
};

expandPackageIncludes = function(profile, callback){
    //process layers which include whole pacakges with "package/*" syntax

    console.log('BEGIN ' + message);

    var count = 0;
    var errState;
    var start = function(){
        count++;
    };
    var end = function(){
        count--;
        if (count == 0 && !errState){
            console.log('DONE  ' + message);
            callback(null, profile);
        }
    };
    var layer,
        toExpand = [],
        i,
        j;

    for (i in profile.layers){
        layer = profile.layers[i];
        if (layer.include){
            for(j = 0; j < layer.include.length; j++){
                if (/\/\*$/.test(layer.include[j])) {
                    toExpand.push({
                        layer: layer,
                        include: layer.include[j]
                    })
                }
            }
        }
    }

    start();
    for (i = 0; i < toExpand.length; i++){
        start();
        expandSingle(toExpand[i].layer, toExpand[i].include, profile, function(err){
            if (err) {callback(err); errState = true; return;}
            end();
        })
    }
    end();
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
