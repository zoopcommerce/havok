var fs = require('fs');

writeProfile = function(profile, callback){
    fs.writeFile(profile.selfPath, 'var profile = ' + JSON.stringify(profile, null, '    '), function(err){
        if (err) {callback(err); return;}
        callback();
    });
}

exports.writeProfile = writeProfile;

