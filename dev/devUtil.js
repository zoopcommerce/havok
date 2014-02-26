var fs = require('fs');
var packages = require('./packages').packageObject();

var isPackageUrl = function(parsedUrl){
    var pathPieces = parsedUrl.pathname.split('/');
    return (pathPieces[1] in packages);
}

var getPackageFile = function(parsedUrl, callback){
    var pathPieces = parsedUrl.pathname.split('/');
    pathPieces.shift();
    var packageName = pathPieces.shift();
    fs.readFile('../' + packages[packageName] + '/' + pathPieces.join('/'), function (err, content) {
        if (err) {callback(err); return;}
        callback(null, content);
    })
}

var getContentType = function(parsedUrl){
    var type = parsedUrl.pathname.split('.').pop();
    var contentType;

    switch (type){
        case 'html':
            contentType = 'text/html';
            break;
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'css':
            contentType = 'text/css';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        default:
            contentType = 'text/plain';
    }
    return contentType;
}

var getFilePath = function(parsedUrl, fileType){
    var filePieces = parsedUrl.pathname.split('.');
    filePieces.pop();
    filePieces.push(fileType);
    return filePieces.join('.');
}

var writeResponse = function(request, response, err, content, contentType){
    if (err) {
        response.writeHeader(404, {"Content-Type": 'text/html'});
        response.write(request.url +' not found');
        return;
    }

    response.writeHeader(200, {"Content-Type": contentType});
    response.write(content);
    response.end();
    console.log(request.method + ' ' + request.url + ' ' + response.statusCode);
}

var getCookies = function (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = parts.shift();
    });

    return list;
}

exports.isPackageUrl = isPackageUrl;
exports.getPackageFile = getPackageFile;
exports.getContentType = getContentType;
exports.getFilePath = getFilePath;
exports.writeResponse = writeResponse;
exports.getCookies = getCookies;