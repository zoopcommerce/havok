var fs = require('fs-extra');
var details = require('./details.json');
var apiPath = require('./docsPaths').twig + '/api/';

var write = function(item, callback){
    var pieces = item.location.split('/'),
        rootPath = pieces.map(function(){return ''}).join('../') + '../',
        shortName = pieces.pop(),
        file = shortName + '.json',
        path = apiPath + pieces.join('/');

    item.rootPath = rootPath;
    item.shortName = shortName;
    var string = JSON.stringify(item, null, 4);
    string = string.replace(/<pre><code>/g, '');
    string = string.replace(/<\/code><\/pre>/g, '');
    fs.outputFile(path + '/' + file, string, function(err) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            console.log(file + ' written');
        }
    });
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
