require('./../dev/docs/renderer');
var message = 'Generating distributable documentation';

var makeDocs = function(callback){
    console.log('BEGIN ' + message);
    require('./../dev/docs/apiGenerateDocs').buildLayer(function(err){
        if (err) {callback(err); return;}
        require('./../dev/docs/buildLayer').generateDocs(function(err){
            if (err) {callback(err); return;}
            require('./../dev/docs/generateHTML').generateHTML(false, function(err){
                if (err) {callback(err); return;}
                var from = __dirname + '/../dist/havok/havok';
                var to = './dist/havok/havok';
                fs.copy(from + '.js', to + '.js', function(err){
                    if (err) {callback(err); return;}
                    fs.copy(from + '.css', to + '.css', function(err){
                        if (err) {callback(err); return;}
                        console.log('DONE  ' + message);
                        callback();
                    })
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
