var path = require('path');

var packages = [
    {
        name:'build',
        location: path.dirname(require.resolve('dojo-util/build/main.js'))
    },
    {
        name:'bootstrap',
        location: path.dirname(require.resolve('bootstrap/package.json'))
    },
    {
        name:'docs',
        location: __dirname + '/../docs/client'
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
        name:'font-awesome',
        location: path.dirname(require.resolve('font-awesome/package.json'))
    },
    {
        name: "havok",
        location: __dirname + '/../src'
    },
    {
        name: "havok-build",
        location: __dirname + '/../build'
    },
    {
        name:'less',
        location: path.dirname(require.resolve('less/package.json'))
    },
    {
        name: "mystique",
        location: path.dirname(require.resolve('mystique/package.json'))
    },
    {
        name: "mystique-common",
        location: path.dirname(require.resolve('mystique-common/package.json'))
    },
    {
        name: "test",
        location: __dirname + '/../test'
    },
    {
        name:'util',
        location: path.dirname(require.resolve('dojo-util/package.json'))
    }
];

var packageArray = function(){
    var havokRoot = __dirname + '/..';
    packages.forEach(function(item){
        item.location = path.relative(havokRoot, item.location);
    })
    return packages;
}

var packageObject = function(){
    var obj = {};
    packageArray().forEach(function(item){
        obj[item.name] = item.location
    })
    return obj;
}

exports.packageArray = packageArray;
exports.packageObject = packageObject;
