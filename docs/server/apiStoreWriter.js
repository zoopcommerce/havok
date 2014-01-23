var fs = require('fs'),
    tree = require(__dirname + '/../build/tree.json'),
    data = [];
    walk = function(node, parentId){
        var i,
            item = {id: node.id};

        if (node.name) item.label = node.name;
        if (parentId) item.parent = parentId;
        item.href = '/api/' + node.id + '.html';
        switch (node.type){
            case 'folder':
                item.type = 'group';
                delete(item.href);
                break;
            case 'constructor':
                item.label = '<span class="icon-wrench"></span> ' + item.label;
                break;
            case 'object':
                item.label = '<span class="icon-circle-blank"></span> ' + item.label;
                break;
            case 'instance':
                item.label = '<span class="icon-circle"></span> ' + item.label;
                break;
            case 'function':
                item.label = '<span class="icon-cog"></span> ' + item.label;
                break;
        }

        data.push(item);
        if (node.children){
            for (i = 0; i < node.children.length; i++){
                walk(node.children[i], node.id);
            }
        }
    };


for (var i = 0; i < tree.children.length; i++){
    walk(tree.children[i]);
}

fs.writeFile(__dirname + '/../src/api/api-tree-data.json', JSON.stringify({data: data}, null, 4) , function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('api-tree-data.json written');
    }
});
