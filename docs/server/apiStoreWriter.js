var fs = require('fs'),
    tree = require('./tree.json'),
    data = [];
    walk = function(node, parentId){
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
                item.text = '<span class="icon-wrench"></span> ' + item.text;
                break;
            case 'object':
                item.text = '<span class="icon-circle-blank"></span> ' + item.text;
                break;
            case 'instance':
                item.text = '<span class="icon-circle"></span> ' + item.text;
                break;
            case 'function':
                item.text = '<span class="icon-cog"></span> ' + item.text;
                break;
        }

        data.push(item);
        if (node.children){
            for (i = 0; i < node.children.length; i++){
                walk(node.children[i], node.id);
            }
        }
    },
    writeStore = function(callback){
        for (var i = 0; i < tree.children.length; i++){
            walk(tree.children[i]);
        }

        fs.writeFile(__dirname + '/../twig/api/api-tree-data.json', JSON.stringify({data: data}, null, 4) , function(err) {
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