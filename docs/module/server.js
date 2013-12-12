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
    Twig = require('./../../vendor/twig/twig'),
    renderer = require('../../dom-lite/renderer'),
    file,
    packages = [
        'dojo',
        'dijit',
        'havok',
        'mystique'
    ],

    getCookies = function (request) {
        var list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = parts.shift();
        });

        return list;
    },

    getParams = function(request){
        var urlObj = url.parse(request.url, true),
            params = urlObj.query ? urlObj.query : {},
            cookies = getCookies(request);

        cookies['havok-docs-theme'] ? params.theme = cookies['havok-docs-theme'] : params.theme = 'zoop';
        params.settings = {views: './../src/'};

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
//        console.log('Response sent for ' + request.url);
    },

    returnPackageFile = function(request, response){
        fs.readFile('./../../../' + request.url, function (err, content) {
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
            jsonParams = require('./../src/' + getFilePath(request, 'json').replace('-content', ''));
        for (i in jsonParams){
            params[i] = jsonParams[i];
        }
        Twig.renderFile('./../src/api/' + template, params, function (err, content) {
            if (err) {
                throw err;
            }
            respond(request, response, content, 'text/html');
        })
    },

    returnRenderedPage = function(request, response){
        Twig.renderFile('./../src/' + getFilePath(request, 'twig'), getParams(request), function (err, content) {
            if (err) {
                throw err;
            }

// Uncomment this to disable server side rendering
            respond(request, response, content, 'text/html');
            return;

            renderer.render(content, function(renderedContent){
                respond(request, response, renderedContent, 'text/html');
            })
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
        fs.readFile('./../src/' + request.url, function (err, content) {
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
