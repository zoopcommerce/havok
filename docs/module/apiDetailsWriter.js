var fs = require('fs'),
    details = require(__dirname + '/../build/details.json'),
    i,
    basePath = __dirname + '/../src/api/',
    write = function(item){

        var pieces = item.location.split('/'),
            apiPath = pieces.map(function(){return ''}).join('../'),
            shortName = pieces.pop(),
            file = shortName + '.json',
            path = basePath + pieces.join('/');

        fs.mkdir(path, null, function(err){
            if (err && err.code != 'EEXIST') {
                console.log(err);
                return;
            }
            item.apiPath = apiPath;
            item.shortName = shortName;
            var string = JSON.stringify(item, null, 4);
            string = string.replace(/<pre><code>/g, '');
            string = string.replace(/<\/code><\/pre>/g, '');
            fs.writeFile(path + '/' + file, string, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(file + ' written');
                }
            });
        })
    }


for (i in details){
    write(details[i]);
}

