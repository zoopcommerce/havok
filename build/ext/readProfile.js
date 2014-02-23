var fs = require('fs');
var path = require('path');

readProfile = function(profilePath, callback){

    fs.readFile(profilePath, function(err, data){
        if (err) {callback(err); return;}

        var profile = (new Function([], data + '; return profile;'))();
        profile.selfPath = path.resolve(profilePath);
        callback(null, profile);
    })
}

exports.readProfile = readProfile

