var argv;

var set = function(value){
    argv = value;
}

var has = function(name){
    return (argv.indexOf(name) !== -1)
}

var getItem = function(index){
    return argv(index);
}

exports.set = set;
exports.has = has;
exports.getItem = getItem;