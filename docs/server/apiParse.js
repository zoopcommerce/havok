var spawn = require('child_process').spawn;

parse = function(callback){
    var apiParse = spawn('node', ['../../../js-doc-parse/parse.js', 'config=api-config.js']);

    apiParse.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    apiParse.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        callback(data);
    });

    apiParse.on('close', function (code) {
        console.log('api parse exited with code ' + code);
        if (code == 0) callback(null, code)
        else callback('api parse failed');
    });
}

if(require.main === module) parse(function(){})
else exports.parse = parse