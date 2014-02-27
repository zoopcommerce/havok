var fs = require('fs');
var tree = require('./tree.json');
var twigPath = require('../docs/twigPath').path;

var data = [];
var walk = function(node, parentId){
    var i,
        item = {id: node.id};

    if (node.name) item.text = node.name;
    if (parentId) item.parent = parentId;
    item.href = '/api/' + node.id + '.html';
    switch (node.type){
        case 'folder':
            item.type = 'group';
            delete(item.href);
            break;
        case 'constructor':
            item.text = '<span class="fa fa-wrench"></span> ' + item.text;
            break;
        case 'object':
            item.text = '<span class="fa fa-circle-o"></span> ' + item.text;
            break;
        case 'instance':
            item.text = '<span class="fa fa-circle"></span> ' + item.text;
            break;
        case 'function':
            item.text = '<span class="fa fa-cog"></span> ' + item.text;
            break;
        default:
            item.text = '<span class="fa fa-file"></span> ' + item.text;
    }

    data.push(item);
    if (node.children){
        for (i = 0; i < node.children.length; i++){
            walk(node.children[i], node.id);
        }
    }
};

var writeStore = function(callback){
        for (var i = 0; i < tree.children.length; i++){
            walk(tree.children[i]);
        }

        fs.writeFile(twigPath + '/api/api-tree-data.json', JSON.stringify({data: data}, null, 4) , function(err) {
            if(err) {
                console.log(err);
                callback(err);
            } else {
                console.log('api-tree-data.json written');
                callback();
            }
        });
    };

if(require.main === module) writeStore(function(){})
else exports.writeStore = writeStore
