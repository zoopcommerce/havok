var fs = require('fs');
var twigPath = require('./twigPath').path;

var generateDocs = function(callback){
    //check that api data files have been generated
    fs.exists(twigPath + '/api/api-tree-data.json', function(exists){
        if (exists){
            callback();
        } else {
            //generate api data files
            require('./apiParse').parse(function(err){
                if (err) {callback(err); return;}
                require('./apiStoreWriter').writeStore(function(err){
                    if (err) {callback(err); return;}
                    require('./apiDetailsWriter').writeDetails(function(err){
                        if (err) {callback(err); return;}
                        callback();
                    })
                })
            })
        }
    })
}

if(require.main === module) generateDocs(function(){})
else exports.generateDocs = generateDocs
