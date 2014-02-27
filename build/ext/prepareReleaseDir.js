var fs = require('fs-extra');
var path = require('path');
var readProfile = require('./readProfile');
var message = 'Make sure release dir exists and is empty';

prepareReleaseDir = function(profile, callback){
    //make sure release dir exists and is empty

    console.log('BEGIN ' + message);

    var releaseDir = path.dirname(profile.selfPath) + '/' + profile.releaseDir;

    //remove any old dir is empty
    fs.remove(releaseDir, function(err){
        if (err) throw err;

        //create empty temp dir
        fs.mkdir(releaseDir, function(err){
            if (err) throw err;
            console.log('DONE  ' + message);
            callback(null, profile);
        })
    })
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        prepareReleaseDir(profile, function(err){
            if (err) throw err
        });
    })
} else {
    exports.process = prepareReleaseDir
}
