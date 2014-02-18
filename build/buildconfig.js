// Dojo Configuration
var path = require('path');

dojoConfig = {
    async: true,
    packages: [
        {
            name:'build',
            location:path.dirname(require.resolve('dojo-util/build/main.js'))
        },
        {
            name: "dojo",
            location: path.dirname(require.resolve('dojo'))
        },
        {
            name: "dijit",
            location: path.dirname(require.resolve('dijit'))
        },
        {
            name: "havok",
            location: __dirname + '/../src'
        },
        {
            name: "havok-build",
            location: __dirname
        },
        {
            name: "mystique",
            location: path.dirname(require.resolve('mystique'))
        },
        {
            name: "mystique-common",
            location: path.dirname(require.resolve('mystique-common/package.json'))
        },
        {
            name:'util',
            location:path.dirname(require.resolve('dojo-util/package.json'))
        }
    ],
    paths: {
        'bootstrap': path.dirname(require.resolve('bootstrap/package.json')),
        'font-awesome': path.dirname(require.resolve('font-awesome/package.json'))
    }
};

//have to load the less compiler before dojo because it doesn't play nice with dojo AMD
lessc = require('less');

require('dojo/dojo.js');
