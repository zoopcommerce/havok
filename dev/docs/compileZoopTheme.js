var lessc = require('less');
var docsPaths = require('./docsPaths');
var path = require('path');

var fs = require('fs-extra');

var compileZoopTheme = function(callback){
    var bootstrapLessFilename = docsPaths.release + '/docs/docs.less';
    var zoopLessFilename = docsPaths.release + '/docs/zoop.less';
    var rawCssFilename = docsPaths.release + '/docs/zoop.uncompressed.css';
    var optCssFilename = docsPaths.dist + '/docs/zoop.css';

    fs.readFile(bootstrapLessFilename, 'utf8', function(err, data){
        if (err) {callback(err); return;}
        data = data.split('\n');
        data.splice(1, 0, "@import 'less/variables.less';");
        data = data.join('\n');
        fs.writeFile(zoopLessFilename, data, function(err){
            if (err) {callback(err); return;}

            //parse the less into css
            var parser = new lessc.Parser({
                    relativeUrls: true,
                    paths: [path.dirname(zoopLessFilename), path.dirname(zoopLessFilename) + '/../'],
                    filename: path.basename(zoopLessFilename)
                }),
                rawCss,
                optCss;

            parser.parse(data, function(err, root){
                if (err) {callback(err); return;}
                rawCss = root.toCSS({compress: false, strictMaths: false, strictUnits: false});
                fs.writeFile(rawCssFilename, rawCss, function(err){
                    if (err) {callback(err); return;}
                    optCss = root.toCSS({compress: true, strictMaths: false, strictUnits: false});
                    fs.writeFile(optCssFilename, optCss, function(err){
                        if (err) {callback(err); return;}
                        callback();
                    })
                })
            })
        })
    });
};

if(require.main === module) {
    compileZoopTheme(function(err){
        if (err) throw err;
    });
} else {
    exports.compileZoopTheme = compileZoopTheme
}
