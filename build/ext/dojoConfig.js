// Dojo Configuration
var path = require('path');
var packages = require('havok/dev/packages');

var setConfig = function(profile){

    dojoConfig = {
        async: true,
        packages: packages.packageArray(),
        paths: {
            'bootstrap': path.dirname(require.resolve('bootstrap/package.json')),
            'font-awesome': path.dirname(require.resolve('font-awesome/package.json'))
        }
    };

    var i;
    var j;
    var name;
    var resolved;

    if (profile && profile.packages){
        for (i = 0; i < profile.packages.length; i++){
            resolved = false;
            name = profile.packages[i].name;
            for (j = 0; j < dojoConfig.packages.length; j++){
                if (dojoConfig.packages[j].name == name){
                    resolved = true;
                }
            }

            if (!resolved && profile.packages[i].location.slice(0,1) == '.'){
                //relative path
                profile.packages[i].location = path.normalize(path.dirname(profile.selfPath) + '/' + profile.packages[i].location);

                //add package into dojoConfig
                dojoConfig.packages.push(profile.packages[i]);
                resolve = true;
            }

            if (!resolved){
                //add package into dojoConfig
                dojoConfig.packages.push(profile.packages[i]);
            }
        }
    }
}

exports.setConfig = setConfig
