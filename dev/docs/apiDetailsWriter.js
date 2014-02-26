var fs = require('fs');
var details = require('./details.json');

var twigPath = require('../docs/twigPath').path + '/api/';

var write = function(item, callback){
    var pieces = item.location.split('/'),
        rootPath = pieces.map(function(){return ''}).join('../') + '../',
        shortName = pieces.pop(),
        file = shortName + '.json',
        path = twigPath + pieces.join('/');

    fs.mkdir(path, null, function(err){
        if (err && err.code != 'EEXIST') {
            console.log(err);
            return;
        }
        item.rootPath = rootPath;
        item.shortName = shortName;
        var string = JSON.stringify(item, null, 4);
        string = string.replace(/<pre><code>/g, '');
        string = string.replace(/<\/code><\/pre>/g, '');
        fs.writeFile(path + '/' + file, string, function(err) {
            if(err) {
                console.log(err);
                callback(err);
            } else {
                console.log(file + ' written');
            }
        });
    })
}

var writeDetails = function(callback){
    var i;
    for (i in details){
        write(details[i], callback);
    }
    callback();
};

if(require.main === module) writeDetails(function(){})
else exports.writeDetails = writeDetails
