var fs = require('fs');
var url = require('url');
var devUtil = require('../devUtil');
var twigPath = require('./docsPaths').twig;
var Twig = require('twig');
var apiGenerateDocs = require('./apiGenerateDocs');

var render = function(parsedUrl, params, domLite, callback){

    var pathPieces = parsedUrl.pathname.split('/');

    var render = function(err){
        if (err) {callback(err); return}
        params.settings = {views: twigPath};
        Twig.renderFile(twigPath + devUtil.getFilePath(parsedUrl, 'twig'), params, function (err, content) {
            if (err) {callback(err); return}

            if (domLite){
                require('./domLiteRenderer').render(content, function(err, renderedContent){
                    callback(err, renderedContent);
                })
            } else {
                callback(null, content);
            }
        })
    }

    if (pathPieces[1] == 'api'){
        apiGenerateDocs.generateDocs(false, function(err){
            if (err) {callback(err); return;}

            var i;
            var jsonParams = require(twigPath + devUtil.getFilePath(parsedUrl, 'json').replace('-content', ''));
            for (i in jsonParams) params[i] = jsonParams[i]
            pathPieces[pathPieces.length - 1] = pathPieces[pathPieces.length - 1].split('.').slice(0, -1).join('.').replace('-content', '');
            params.location = pathPieces.slice(2).join('/');
            parsedUrl = url.parse((parsedUrl.pathname.indexOf('-content') != -1) ? '/api/doc-content.html' : '/api/doc.html');
            render();
        })
    } else if (parsedUrl.pathname == '/api.twig' || parsedUrl.pathname == '/api-content.twig'){
        apiGenerateDocs.generateDocs(false, render);
    } else {
        render();
    }
};

exports.render = render
