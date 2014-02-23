require('../nodeconfig');
var fs = require('fs');
var util = require('util');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

fixupLocationsAndPaths = function(profile, callback){
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
