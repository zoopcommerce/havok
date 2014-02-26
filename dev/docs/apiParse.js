var spawn = require('child_process').spawn;

parse = function(callback){
    var apiParse = spawn('node', [require.resolve('js-doc-parse/parse'), 'config=' + __dirname + '/apiConfig.js']);

    apiParse.stdout.on('data', function (data) {
        console.log('LOG js-doc-parse: ' + data);
    });

    apiParse.stderr.on('data', function (data) {
        console.log('ERR js-doc-parse: ' + data);
    });

    apiParse.on('close', function (code) {
        console.log('api parse exited with code ' + code);
        if (code == 0) callback(null, code)
        else callback('api parse failed');
    });
}

if(require.main === module) parse(function(){})
else exports.parse = parse