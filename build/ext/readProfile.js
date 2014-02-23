var fs = require('fs');

readProfile = function(profilePath, callback){

    fs.readFile(profilePath, function(err, data){
        if (err) {callback(err); return;}

        var profile = (new Function([], data + '; return profile;'))();
        profile.selfPath = profilePath;
        callback(null, profile);
    })
}

exports.readProfile = readProfile

