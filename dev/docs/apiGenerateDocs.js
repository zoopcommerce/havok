var fs = require('fs-extra');
var twigPath = require('./twigPath').path;

var generateDocs = function(force, callback){
    //check that api data files have been generated
    fs.exists(twigPath + '/api/api-tree-data.json', function(exists){
        if (exists && !force){
            callback();
            return;
        }

        fs.remove(twigPath + '/api/dijit', function(err){
            if (err) {callback(err); return;}
            fs.remove(twigPath + '/api/dojo', function(err){
                if (err) {callback(err); return;}
                fs.remove(twigPath + '/api/havok', function(err){
                    if (err) {callback(err); return;}
                        fs.remove(twigPath + '/api/mystique', function(err){
                        if (err) {callback(err); return;}
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
                    })
                })
            })
        })
    })
}

if(require.main === module) generateDocs(true, function(){})
else exports.generateDocs = generateDocs
