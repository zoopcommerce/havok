require('./../dev/docs/renderer');
var fs = require('fs-extra');
var message = 'Generating distributable documentation';

var makeDocs = function(callback){
    console.log('BEGIN ' + message);

    require('./../dev/docs/apiGenerateDocs').generateDocs(true, function(err){
        if (err) {callback(err); return;}
        require('./../dev/docs/buildLayer').buildLayer(function(err){
            if (err) {callback(err); return;}
            require('./../dev/docs/compileZoopTheme').compileZoopTheme(function(err){
                if (err) {callback(err); return;}
                require('./../dev/docs/generateHTML').generateHTML(false, function(err){
                    if (err) {callback(err); return;}
                    console.log('DONE  ' + message);
                    callback();
                })
            })
        })
    })
};

if(require.main === module) {
    makeDocs(function(err){
        if (err) throw err;
    });
} else {
    exports.make = makeDocs
}
