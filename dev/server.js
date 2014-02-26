//This is a simple router and server to assist developing havok
//
//It can be used to:
// - Run tests in a browser
// - Browse unbuilt docs
// - Browse built docs
//
//It works, but it contains no
//proper error handling, security or other things you might expect
//from a full fledged server
//
//to start the server use one of these:
//>node server.js runtests
//>node server.js docs
//>node server.js dist-docs
//
//to start without dom-lite server side rendering on unbuilt docs use:
//>node server.js docs no-dom-lite
//
//then point your browser to:
//http://localhost


var http = require('http');
var fs = require('fs');
var url = require('url');
var argv = require('./argv');

http.createServer(function(request, response) {

    argv.set(process.argv);

    switch (process.argv[2]){
        case 'runtests':
            require('./controller/tests').process(request, response, function(err){
                if (err) throw err
            });
            break;
        case 'dist-docs':
            break;
        case 'docs':
        default:
            require('./controller/docs').process(request, response, function(err){
                if (err) throw err
            });
    }
}).listen(80, '127.0.0.1');

console.log("Server running at http://127.0.0.1:80/");
