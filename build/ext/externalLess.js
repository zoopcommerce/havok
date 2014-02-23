var fs = require('fs');
var util = require('util');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

externalLess = function(profile, callback){
    //make sure bootstrap and font-awesome less are accessable
    if (!profile.dirs) profile.dirs = []
    profile.dirs.push([profile.paths['bootstrap'] + '/less', 'bootstrap/less']);
    profile.dirs.push([profile.paths['font-awesome'] + '/less', 'font-awesome/less']);

    callback(null, profile);
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        externalLess(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = externalLess
}
