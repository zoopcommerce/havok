var fs = require('fs-extra');
var path = require('path');
var readProfile = require('./readProfile');

copyDist = function(profile, callback){

    var count = 0;
    var start = function(){
        count++;
    };
    var end = function(){
        count--;
        if (count == 0){
            callback(null, profile);
        }
    };
    var copy = function(layer, type){
        start();
        fs.stat(releaseDir + layer + '.' + type, function(err){
            if (!err) {
                fs.copy(releaseDir + layer + '.' + type, distDir + layer + '.' + type, function(err){
                    end();
                })
            }
        })
    };

    if (profile.distDir){
        var releaseDir = path.dirname(profile.selfPath) + '/' + profile.releaseDir + '/';
        var distDir = path.dirname(profile.selfPath) + '/' + profile.distDir + '/';
        start();
        for (var i in profile.layers){
            copy(i, 'js');
            copy(i, 'css');
        }
        end();
    }
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        copyDist(profile, function(err){
            if (err) throw err
        });
    })
} else {
    exports.process = copyDist
}
