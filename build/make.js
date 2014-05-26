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
var message = 'Havok build tool';

var make = function(profilePath, callback){
    console.log('BEGIN ' + message);

    if (!profilePath) profilePath = __dirname + '/profile/dist.profile.js'

    //read porfile first
    readProfile.readProfile(profilePath, function(err, profile){
        if (err) throw err;

        var i = 0;

        var doProcess = function(profileToProcess){
            processes[i].process(profileToProcess, function(err, processedProfile){
                if (err) {callback(err); return;}
                i++;
                if (i < processes.length){
                    doProcess(processedProfile);
                } else {
                    console.log('DONE  ' + message);
                    callback(null, processedProfile);
                }
            })
        }
        doProcess(profile);
    })
}

if(require.main === module) {
    make(process.argv[2], function(err){
        if (err) throw err;
    })
} else {
    exports.make = make
}
