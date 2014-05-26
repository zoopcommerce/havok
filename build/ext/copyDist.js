var fs = require('fs-extra');
var path = require('path');
var readProfile = require('./readProfile');
var message = 'Copying layers to dist directory';

copyDist = function(profile, callback){

    console.log('BEGIN ' + message);

    var count = 0;
    var start = function(){
        count++;
    };
    var end = function(){
        count--;
        if (count == 0){
            console.log('DONE  ' + message);
            callback(null, profile);
        }
    };
    var copy = function(layer, type){
        var from = releaseDir + layer + '.' + type;
        var to = distDir + layer + '.' + type;
        start();
        fs.stat(from, function(err){
            if (err) {end(); return;}
            console.log('LOG   Copying ' + from + ' to ' + to);
            fs.copy(from, to, function(err){
                end();
            })
        })
    };

    if (profile.distDir){
        var releaseDir = profile.basePath + '/' + profile.releaseDir + '/';
        var distDir = profile.basePath + '/' + profile.distDir + '/';
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
