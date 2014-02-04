//This is a simple router and server
//It works for running tests in the browser
//
//to start the server use:
//>node server.js
//
//then point your browser to:
//http://localhost

var http = require('http'),
    url = require('url'),
    fs = require('fs'),

    respond = function(request, response, content, contentType){
        response.writeHeader(200, {"Content-Type": contentType});
        response.write(content);
        response.end();
        console.log(request.method + ' ' + request.url + ' ' + response.statusCode);
    },

    respond404 = function(request, response){
        response.writeHeader(404, {"Content-Type": 'text/html'});
        response.write('404. Resource not found.');
        response.end();
        console.log('404 sent for ' + request.url);
    },

    returnResource = function(request, response){
        var contentType;
        switch (request.url.split('.').pop()){
            case 'png':
                contentType = 'image/png';
                break;
            case 'js':
                contentType = 'text/javascript';
                break;
            case 'css':
                contentType = 'text/css';
                break;
        }
        fs.readFile('./../' + url.parse(request.url).pathname, function (err, content) {
            if (err) {
                respond404(request, response);
            }
            respond(request, response, content, contentType);
        })
    };

http.createServer(function(request, response) {
    returnResource(request, response);
}).listen(80, '127.0.0.1');

console.log("Server running at http://127.0.0.1:80/");
