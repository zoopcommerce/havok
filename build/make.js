var processes = [
    require('ext/prepareReleaseDir'),
    require('ext/mixinDefault'),
    require('ext/fixupLocationsAndPaths'),
    require('ext/externalLess'),
    require('ext/expandPackageIncludes'),
    require('ext/mergeConfigs'),
    require('ext/build'),
    require('ext/complieLess'),
    require('ext/copyDist')
];


var copyDist = function(callback){
    var temp = __dirname + '/../temp';
    var dist = __dirname + '/../dist';

    fs.copy(temp + '/havok/havok.js', dist + '/havok/havok.js', function(){
        fs.copy(temp + '/havok/havok.css', dist + '/havok/havok.css', function(){
            callback();
        })
    })
}

var make = function(profile, callback){
    console.log('begin havok dist build');

    var i = 0;

    var doProcess = function(){
        processes[i].process(profile, function(err, processedProfile){
            if (err) {callback(err); return;}
            i++;
            if (i < processes.length){
                doProcess();
            } else {
                callback(null, processedProfile);
            }
        })
    }
    doProcess();
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
