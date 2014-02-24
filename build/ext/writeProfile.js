var fs = require('fs');

writeProfile = function(profile, callback){
    fs.writeFile(profile.selfPath, 'var profile = ' + JSON.stringify(profile, null, '    '), function(err){
        if (err) {callback(err); return;}
        console.log('Wrote profile: ' + profile.selfPath);
        callback();
    });
}

exports.writeProfile = writeProfile;

