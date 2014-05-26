var fs = require('fs');
var url = require('url');
var devUtil = require('../devUtil');

var process = function(request, response, callback){
    var parsedUrl = url.parse(request.url);
    var pathPieces = parsedUrl.pathname.split('/');

    if (pathPieces[1] == ''){
        var content = '<head><meta http-equiv="refresh" content="0; url=http://localhost/client.html?config=test/intern" /></head>';
        devUtil.writeResponse(request, response, null, content, 'text/html');
        callback();
    } else if (devUtil.isPackageUrl(parsedUrl)){
        devUtil.getPackageFile(parsedUrl, function(err, content){
            devUtil.writeResponse(request, response, err, content, devUtil.getContentType(parsedUrl));
            callback(err);
        })
    } else {
        fs.readFile(require.resolve('intern/' + parsedUrl.pathname), function(err, content){
            devUtil.writeResponse(request, response, err, content, devUtil.getContentType(parsedUrl));
            callback(err);
        })
    }
}

exports.process = process;
