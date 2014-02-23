var fs = require('fs');
var util = require('util');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

mixinDefault = function(profile, callback){

    require('./dojoConfig').setConfig(profile);
    require('dojo/dojo.js');

    fs.readFile(__dirname + '/../defaultProfile.js', function(err, data){
        if (err) {callback(err); return;}

        var defaultProfile = (new Function([], data + '; return profile;'))();

        global.require(['havok/lang'], function(lang){
            profile = lang.mixinDeep(defaultProfile, profile);
            callback(null, profile);
        });
    })
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        mixinDefault(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = mixinDefault
}
