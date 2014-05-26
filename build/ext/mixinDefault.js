var fs = require('fs');
var util = require('util');
var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');
var message = 'Mixin build profile defaults';

mixinDefault = function(profile, callback){

    console.log('BEGIN ' + message);

    require('./dojoConfig').setConfig(profile);
    require('dojo/dojo.js');

    fs.readFile(__dirname + '/../defaultProfile.js', function(err, data){
        if (err) {callback(err); return;}

        var defaultProfile = (new Function([], data + '; return profile;'))();

        global.require(['havok/lang'], function(lang){
            profile = lang.mixinDeep(defaultProfile, profile);
            console.log('DONE  ' + message);
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
