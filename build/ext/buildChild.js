require('../nodeconfig');
require('dojo/dojo.js');

build = function(profilePath, callback){

    // do the actual dojo build
    process.argv[2] = 'load=build';
    process.argv[3] = '--profile';
    process.argv[4] = profilePath;

    global.require(['build/main'], function(){})
}

if(require.main === module) {
    build(process.argv[2], function(){});
} else {
    exports.process = build
}
