//Build the havok.js and havok.css distributable
//Run this script from havok/build directory

var spawn = require('child_process').spawn,
    fs = require('fs-extra'),
    dive = require('dive');

var scanHavok = function(callback){

    var path = fs.realpathSync('./../src');
    var tagger = (new Function([], fs.readFileSync(path + '/havok.profile.js') + '; return profile;'))().resourceTags;
    var mids = [];

    dive(
        path,
        function(err, file){
            if (err) {console.log(err); return;}

            var mid = 'havok/' + file.replace(path, '').slice(1, -3).replace(/\\/g, '/');
            if (tagger.amd(file, mid) && !tagger.miniExclude(file, mid)){
                mids.push(mid);
                console.log('inject ' + mid);
            }
        },
        function(){
            var profile = (new Function([], fs.readFileSync('./profile/dist.profile.js') + '; return profile;'))();
            profile.layers['havok/havok'].include = mids;
            fs.writeFileSync('./profile/dist.profile.allmids.js', 'var profile = ' + JSON.stringify(profile, null, '    '));
            callback();
        }
    );
};

var preprocess = function(callback){
    var preprocess = spawn('node', ['./buildconfig.js', 'load=havok-build/preprocess', '--profile', './profile/dist.profile.allmids.js']);

    preprocess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    preprocess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    preprocess.on('close', function (code) {
        callback();
    });
}

var build = function(callback){
    var build = spawn('node', ['./buildconfig.js', 'load=build', '--profile', './profile/dist.profile.allmids.preprocessed.js']);

    build.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    build.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    build.on('close', function (code) {
        callback();
    });
}

var prepareTempDir = function(callback){
    var temp = __dirname + '/../temp';

    //remove any old temp dir is empty
    fs.remove(temp, function(err){
        if (err) throw err;

        //create empty temp dir
        fs.mkdir(temp, function(err){
            if (err) throw err;
            callback();
        })
    })
}

var copyDist = function(callback){
    var temp = __dirname + '/../temp';
    var dist = __dirname + '/../dist';

    fs.copy(temp + '/havok/havok.js', dist + '/havok/havok.js', function(){
        fs.copy(temp + '/havok/havok.css', dist + '/havok/havok.css', function(){
            callback();
        })
    })
}

var cleanup = function(callback){
    var temp = __dirname + '/../temp';

    //remove temp dir
    fs.remove(temp, function(err){
        if (err) throw err;
        callback();
    })
}

make = function(callback){
    console.log('begin havok dist build');

    scanHavok(function(){
        prepareTempDir(function(){
            //preprocess profile
            preprocess(function(){
                //do the actual build
                build(function(){
                    //copyDist(function(){
                        //cleanup(function(){
                            console.log('havok dist build complete');
                            callback();
                        //})
                    //})
                })
            })
        })
    });
}

if(require.main === module) make(function(){})
else exports.make = make
