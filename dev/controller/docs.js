var fs = require('fs');
var url = require('url');
var devUtil = require('../devUtil');
var argv = require('../argv');
var Twig = require('twig');

var twigPath = require('../docs/twigPath').path;

var getParams = function(request){
    var parsedUrl = url.parse(request.url, true),
        params = parsedUrl.query ? parsedUrl.query : {},
        cookies = devUtil.getCookies(request);

    cookies['havok-docs-theme'] ? params.theme = cookies['havok-docs-theme'] : params.theme = 'zoop';
    params.settings = {views: twigPath};

    return params;
};

var generateApiDocs = function(callback){
    //check that api data files have been generated
    fs.exists(twigPath + '/api/api-tree-data.json', function(exists){
        if (exists){
            callback();
        } else {
            //generate api data files
            require('../docs/apiParse').parse(function(err){
                if (err) {callback(err); return;}
                require('../docs/apiStoreWriter').writeStore(function(err){
                    if (err) {callback(err); return;}
                    require('../docs/apiDetailsWriter').writeDetails(function(err){
                        if (err) {callback(err); return;}
                        callback();
                    })
                })
            })
        }
    })
}

var renderPage = function(parsedUrl, params, callback){

    var template = devUtil.getFilePath(parsedUrl, 'twig');

    var render = function(){
        Twig.renderFile(twigPath + template, params, function (err, content) {
            if (err) {callback(err); return}

            if (argv.has('no-dom-lite')){
                callback(null, content);
            } else {
                require('../docs/renderer').render(content, function(err, renderedContent){
                    callback(err, renderedContent);
                })
            }
        })
    }

    if (template == '/api.twig' || template == '/api-content.twig'){
        generateApiDocs(render);
    } else {
        render();
    }
};

var process = function(request, response, callback){
    var parsedUrl = url.parse(request.url);
    var pathPieces = parsedUrl.pathname.split('/');
    var contentType = devUtil.getContentType(parsedUrl);

    if (pathPieces[1] == ''){
        parsedUrl = url.parse('/index.html');
        renderPage(parsedUrl, getParams(request), function(err, content){
            devUtil.writeResponse(request, response, err, content, 'text/html');
            callback(err);
        })
    } else if (devUtil.isPackageUrl(parsedUrl)){
        devUtil.getPackageFile(parsedUrl, function(err, content){
            devUtil.writeResponse(request, response, err, content, contentType);
            callback(err);
        })
    } else if (contentType == 'text/html' && pathPieces[1] == 'api'){
        generateApiDocs(function(err){
            if (err) {callback(err); return;}

            var i;
            var params = getParams(request);
            var jsonParams = require(twigPath + devUtil.getFilePath(parsedUrl, 'json').replace('-content', ''));
            for (i in jsonParams) params[i] = jsonParams[i]
            pathPieces[pathPieces.length - 1] = pathPieces[pathPieces.length - 1].split('.').slice(0, -1);
            params.location = pathPieces.slice(2).join('/');

            parsedUrl = url.parse((request.url.indexOf('-content') != -1) ? '/api/doc-content.html' : '/api/doc.html');
            renderPage(parsedUrl, params, function(err, content){
                devUtil.writeResponse(request, response, err, content, contentType);
                callback(err);
            })
        })
    } else if (contentType == 'text/html'){
        renderPage(parsedUrl, getParams(request), function(err, content){
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
