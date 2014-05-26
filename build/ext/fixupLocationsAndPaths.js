var fs = require('fs');
var path = require('path');
var util = require('util');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');
var message = 'Fixup package locations and profile paths';

fixupLocationsAndPaths = function(profile, callback){

    console.log('BEGIN ' + message);

    require('./dojoConfig').setConfig(profile);

    //fixup package locations
    var i,
        j,
        name;

    for (i = 0; i < profile.packages.length; i++){
        name = profile.packages[i].name;
        for (j = 0; j < dojoConfig.packages.length; j++){
            if (dojoConfig.packages[j].name == name){
                profile.packages[i].location = dojoConfig.packages[j].location;
            }
        }
    }

    //fixup paths
    for (i in profile.paths){
        if (dojoConfig.paths[i]){
            profile.paths[i] = dojoConfig.paths[i];
        }
    }

    profile.basePath = dojoConfig.baseUrl;
    profile.releaseDir = path.relative(profile.basePath, path.dirname(profile.selfPath) + '/' + profile.releaseDir);
    if (profile.distDir) profile.distDir = path.relative(profile.basePath, path.dirname(profile.selfPath) + '/' + profile.distDir);

    console.log('DONE  ' + message);
    callback(null, profile);
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        fixupLocationsAndPaths(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = fixupLocationsAndPaths
}
