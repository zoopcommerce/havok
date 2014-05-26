var fs = require('fs');
var path = require('path');
var message = 'Read profile: ';

readProfile = function(profilePath, callback){

    console.log('BEGIN ' + message + profilePath);

    fs.readFile(profilePath, function(err, data){
        if (err) {callback(err); return;}

        var profile = (new Function([], data + '; return profile;'))();
        profile.selfPath = path.resolve(profilePath);
        console.log('DONE  ' + message + profilePath);
        callback(null, profile);
    })
}

exports.readProfile = readProfile

