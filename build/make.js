var processes = [
    require('./ext/prepareReleaseDir'),
    require('./ext/mixinDefault'),
    require('./ext/fixupLocationsAndPaths'),
    require('./ext/externalLess'),
    require('./ext/expandPackageIncludes'),
    require('./ext/mergeConfigs'),
    require('./ext/build'),
    require('./ext/compileLess'),
    require('./ext/copyDist')
];

var readProfile = require('./ext/readProfile');
var writeProfile = require('./ext/writeProfile');

var make = function(profile, callback){
    console.log('begin havok dist build');

    var i = 0;

    var doProcess = function(profileToProcess){
        processes[i].process(profileToProcess, function(err, processedProfile){
            if (err) {callback(err); return;}
            i++;
            if (i < processes.length){
                doProcess(processedProfile);
            } else {
                callback(null, processedProfile);
            }
        })
    }
    doProcess(profile);
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        make(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.make = make
}
