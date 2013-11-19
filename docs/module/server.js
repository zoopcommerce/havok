//This is a simple router and server
//It works for browsing the unbuilt docs, but it contains no
//proper error handling, security or other things you might expect
//from a full fledged server
//
//to start the server use:
//>node server.js
//
//then point your browser to:
//http://localhost

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    Twig = require(__dirname + '/../../vendor/twig/twig'),
    file,
    packages = [
        'dojo',
        'dijit',
        'havok',
        'mystique'
    ],

    getParams = function(request){
        var urlObj = url.parse(request.url, true),
            params = urlObj.query ? urlObj.query : {};

        if (!params.theme) params.theme = 'zoop';
        params.settings = {views: __dirname + '/../src/'};

        return params;
    },

    getFilePath = function(request, fileType){
        var filePieces = request.url.split('.');
        filePieces.pop();
        return filePieces + '.' + fileType;
    },

    respond = function(request, response, content, contentType){
        response.writeHeader(200, {"Content-Type": contentType});
        response.write(content);
        response.end();
        console.log('Response sent for ' + request.url);
    },

    returnPackageFile = function(request, response){
        fs.readFile(__dirname + '/../../../' + request.url, function (err, content) {
            if (err) {
                throw err;
            }
            respond(request, response, content, 'text/javascript');
        })
    },

    returnRenderedApiPage = function(request, response){
        var template,
            i;

        if (request.url.indexOf('-content') != -1){
            //return content only
            template = 'doc-content.twig';
        } else {
            //return full page
            template = 'doc.twig';
        }

        var params = getParams(request),
            jsonParams = require(__dirname + '/../src/' + getFilePath(request, 'json').replace('-content', ''));
        for (i in jsonParams){
            params[i] = jsonParams[i];
        }
        Twig.renderFile(__dirname + '/../src/api/' + template, params, function (err, content) {
            if (err) {
                throw err;
            }
            respond(request, response, content, 'text/html');
        })
    },

    returnRenderedPage = function(request, response){
        Twig.renderFile(__dirname + '/../src/' + getFilePath(request, 'twig'), getParams(request), function (err, content) {
            if (err) {
                throw err;
            }
            respond(request, response, content, 'text/html');
        })
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
        fs.readFile(__dirname + '/../src/' + request.url, function (err, content) {
            if (err) {
                throw err;
            }
            respond(request, response, content, contentType);
        })
    };

http.createServer(function(request, response) {
    var pathPieces = url.parse(request.url).pathname.split('/');

    if (packages.indexOf(pathPieces[1]) != -1){
        //A file from one of the js packages has been requested.
        //Just return that file.
        returnPackageFile(request, response);
    } else if (request.url.split('.').pop() == 'html') {
        if (pathPieces[1] == 'api') {
            returnRenderedApiPage(request, response);
        } else {
            returnRenderedPage(request, response);
        }
    } else {
        returnResource(request, response);
    }
}).listen(80, '127.0.0.1');

console.log("Server running at http://127.0.0.1:80/");
