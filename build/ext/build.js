var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');
var fork = require('child_process').fork;

build = function(profile, callback){
    //make sure the pofile is written

    profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
    writeProfile.writeProfile(profile, function(err){
        if (err) {callback(err); return;}


        // do the actual dojo build in a fork - has to be done this way
        // becuase the dojo build tool uses `process.exit`
        // Note to others, NEVER USE PROCESS.EXIT. It make reuse harder.

        var buildChild = fork('./ext/buildChild.js', [profile.selfPath]);

        buildChild.on('close', function (code) {
            if (code != 0) {callback('dojo build failed'); return;}
            callback(null, profile);
        });
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
