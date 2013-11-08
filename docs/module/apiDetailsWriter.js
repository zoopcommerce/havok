var fs = require('fs'),
    details = require(__dirname + '/../build/details.json'),
    i,
    basePath = __dirname + '/../src/api/',
    write = function(item){

        var pieces = item.location.split('/'),
            file = pieces.pop() + '.json',
            path = basePath + pieces.join('/');

        fs.mkdir(path, null, function(err){
            if (err && err.code != 'EEXIST') {
                console.log(err);
                return;
            }
            fs.writeFile(path + '/' + file, JSON.stringify(item, null, 4), function(err) {
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

