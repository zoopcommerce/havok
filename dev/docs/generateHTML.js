var fs = require('fs-extra');
var path = require('path');
var twigPath = require('./twigPath').path;
var render = require('./renderer').render;
var url = require('url');
var dive = require('dive');
var message = 'Generating docs html from twig templates';

var getParams = function(){
    var params = {generateHTML: true};

    return params;
}

var generateHTML = function(domLite, callback){

    console.log('BEGIN ' + message);

    var count = 0;
    var errState;
    var start = function(){
        count++;
    };
    var end = function(){
        count--;
        if (count == 0 && !errState){
            console.log('DONE  ' + message);
            callback(null, profile);
        }
    };

    var distDir = path.normalize(twigPath + '/../dist');

    fs.readdir(twigPath, function(err, list){
        if (err) {callback(err); return;}
        start();
        list.forEach(function(filename){
            start();
            if (filename.slice(0,1) == '_') {
                //skip any files that start with underscore
                return
            }

            fs.stat(twigPath + '/' + filename, function(err, stat){
                if (err) {callback(err); errState = true; return;}
                if (!stat.isDirectory()){

                    if (filename.split('.').slice(-1) == 'twig'){
                        //render any twig files
                        render(url.parse('/' + filename), getParams(), domLite, function(err, content){
                            if (err) {callback(err); errState = true; return;}
                            var htmlFile = distDir + '/' + filename.split('.').slice(0, -1).join('.') + '.html';
                            fs.outputFile(htmlFile, content, function(err){
                                if (err) {callback(err); errState = true; return;}
                                console.log('LOG   HTML written to: ' + htmlFile);
                                end();
                            });
                        })
                    } else {
                        //just copy anything else
                        var from = twigPath + '/' + filename;
                        var to = distDir + '/' + filename;
                        fs.copy(from, to, function(err){
                            if (err) {callback(err); errState = true; return;}
                            console.log('LOG   Copy to: ' + to);
                            end();
                        })
                    }
                }
            })
        })
        end();
    })

    //generate api HTML
    var packageNames = ['dijit', 'dojo', 'havok', 'mystique'];
    packageNames.forEach(function(item){
        start();
        var packagePath = twigPath + '/api/' + item;
        dive(
            packagePath,
            function(err, filepath){
                if (err) {callback(err); errState = true; return;}
                var basePath = filepath.replace(twigPath, '').replace(/\\/g, '/').split('.').slice(0, -1).join('.');
                start();
                render(url.parse(basePath + '.html'), getParams(), domLite, function(err, content){
                    if (err) {callback(err); errState = true; return;}
                    var htmlFile = distDir + basePath + '.html';
                    fs.outputFile(htmlFile, content, function(err){
                        if (err) {callback(err); errState = true; return;}
                        console.log('LOG   HTML written to: ' + htmlFile);
                        end();
                    });
                })
                start();
                render(url.parse(basePath + '-content.html'), getParams(), domLite, function(err, content){
                    if (err) {callback(err); errState = true; return;}
                    var htmlFile = distDir + basePath + '-content.html';
                    fs.outputFile(htmlFile, content, function(err){
                        if (err) {callback(err); errState = true; return;}
                        console.log('LOG   HTML written to: ' + htmlFile);
                        end();
                    });
                })
            },
            end
        );
    })
}

if(require.main === module) generateHTML(false, function(err){if (err) throw err})
else exports.generateHTML = generateHTML
