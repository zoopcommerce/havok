var fs = require('fs-extra');
var path = require('path');
var twigPath = require('./twigPath').path;
var render = require('./renderer').render;
var url = require('url');
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
                            fs.writeFile(htmlFile, content, function(err){
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
}

if(require.main === module) generateHTML(false, function(){})
else exports.generateHTML = generateHTML
