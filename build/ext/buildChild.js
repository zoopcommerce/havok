var readProfile = require('./readProfile');

build = function(profilePath, callback){

    readProfile.readProfile(profilePath, function(err, profile){
        if (err) throw err;

        require('./dojoConfig').setConfig(profile);
        require('dojo/dojo.js');

        // do the actual dojo build
        process.argv[2] = 'load=build';
        process.argv[3] = '--profile';
        process.argv[4] = profilePath;

        global.require(['build/main'], function(){})
    })
}

if(require.main === module) {
    build(process.argv[2], function(){});
} else {
    exports.process = build
}
