var fs = require('fs');
var path = require('path');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

prepareReleaseDir = function(profile, callback){
    //make sure release dir exists and is empty

    var releaseDir = path.dirname(profile.selfPath) + profile.releaseDir;

    //remove any old dir is empty
    fs.remove(releaseDir, function(err){
        if (err) throw err;

        //create empty temp dir
        fs.mkdir(releaseDir, function(err){
            if (err) throw err;
            callback();
        })
    })

    callback(null, profile);
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        prepareReleaseDir(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = prepareReleaseDir
}
