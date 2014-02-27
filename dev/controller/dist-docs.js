var fs = require('fs');
var url = require('url');
var devUtil = require('../devUtil');
var docsDistDir = __dirname + '/../../docs/dist/';

var process = function(request, response, callback){
    var parsedUrl = url.parse(request.url);
    var pathPieces = parsedUrl.pathname.split('/');

    if (pathPieces[1] == ''){
        parsedUrl = url.parse('/index.html');
    }
    fs.readFile(require.resolve(docsDistDir + parsedUrl.pathname), function(err, content){
        devUtil.writeResponse(request, response, err, content, devUtil.getContentType(parsedUrl));
        callback(err);
    })
}

exports.process = process;
