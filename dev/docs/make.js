require('./renderer');
var message = 'Generating distributable documentation';

var makeDocs = function(callback){
    console.log('BEGIN ' + message);
    require('./buildLayer').buildLayer(function(err){
        if (err) {callback(err); return;}
        require('./generateHTML').generateHTML(false, function(err){
            if (err) {callback(err); return;}
            console.log('DONE  ' + message);
            callback();
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
