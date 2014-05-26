var make = require('../../build/make');
var fs = require('fs-extra');

var buildLayer = function(callback){
    make.make(__dirname + '/docs.profile.js', function(err){
        callback(err);
    });
};

if(require.main === module) {
    buildLayer(function(err){
        if (err) throw err;
    });
} else {
    exports.buildLayer = buildLayer
}
