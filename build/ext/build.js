require('../nodeconfig');
require('dojo/dojo.js');

var readProfile = require('./readProfile');

build = function(profile, callback){

    // do the actual dojo build
    process.argv[2] = 'load=build';
    process.argv[3] = '--profile';
    process.argv[4] = profile.selfPath;

    global.require(['build/main'], function(main){
        callback(null, profile);
    })
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        build(profile, function(err){
            if (err) throw err;
        });
    })
} else {
    exports.process = build
}
