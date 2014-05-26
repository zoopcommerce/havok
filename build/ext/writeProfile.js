var fs = require('fs');
var message = 'Write profile: ';

writeProfile = function(profile, callback){

    console.log('BEGIN ' + message + profile.selfPath);

    fs.writeFile(profile.selfPath, 'var profile = ' + JSON.stringify(profile, null, '    '), function(err){
        if (err) {callback(err); return;}
        console.log('DONE  ' + message + profile.selfPath);        
        callback();
    });
}

exports.writeProfile = writeProfile;

