var fs = require('fs');
var url = require('url');
var devUtil = require('../devUtil');
var argv = require('../argv');
var render = require('../docs/renderer').render;
var twigPath = require('../docs/twigPath').path;

var getParams = function(request){
    var parsedUrl = url.parse(request.url, true),
        params = parsedUrl.query ? parsedUrl.query : {},
        cookies = devUtil.getCookies(request);

    cookies['havok-docs-theme'] ? params.theme = cookies['havok-docs-theme'] : params.theme = 'zoop';

    return params;
};

var process = function(request, response, callback){
    var parsedUrl = url.parse(request.url);
    var pathPieces = parsedUrl.pathname.split('/');
    var contentType = devUtil.getContentType(parsedUrl);

    if (pathPieces[1] == ''){
        parsedUrl = url.parse('/index.html');
        render(parsedUrl, getParams(request), !argv.has('no-dom-lite'), function(err, content){
            devUtil.writeResponse(request, response, err, content, 'text/html');
            callback(err);
        })
    } else if (devUtil.isPackageUrl(parsedUrl)){
        devUtil.getPackageFile(parsedUrl, function(err, content){
            devUtil.writeResponse(request, response, err, content, contentType);
            callback(err);
        })
    } else if (contentType == 'text/html'){
        render(parsedUrl, getParams(request), !argv.has('no-dom-lite'), function(err, content){
            devUtil.writeResponse(request, response, err, content, contentType);
            callback(err);
        })
    } else {
        fs.readFile(twigPath + '/' + request.url, function (err, content) {
            devUtil.writeResponse(request, response, err, content, contentType);
            callback(err);
        })
    }
}

exports.process = process;
