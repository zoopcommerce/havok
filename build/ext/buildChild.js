var readProfile = require('./readProfile');
var message = 'Inside child process. Doing dojo build.';

build = function(profilePath, callback){
    console.log('BEGIN ' + message);

    readProfile.readProfile(profilePath, function(err, profile){
        if (err) throw err;

        require('./dojoConfig').setConfig(profile);
        require('dojo/dojo.js');

        // do the actual dojo build
        process.argv[2] = 'load=build';
        process.argv[3] = '--profile';
        process.argv[4] = profilePath;

        global.require(['build/main'], function(){
            console.log('DONE  ' + message);
            callback();
        })
    })
}

if(require.main === module) {
    build(process.argv[2], function(){});
} else {
    exports.process = build
}
