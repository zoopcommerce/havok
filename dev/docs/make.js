var make = require('../../build/make');
var fs = require('fs-extra');

var makeDocs = function(callback){
    make.make('docs.profile.js', function(err){
        if (err) {callback(err); return;}
    });
};

if(require.main === module) {
    makeDocs(function(err){
        if (err) throw err;
    });
} else {
    exports.make = makeDocs
}
