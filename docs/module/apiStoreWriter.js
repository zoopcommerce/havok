var fs = require('fs'),
    tree = require(__dirname + '/../build/tree.json'),
    data = [];
    walk = function(node, parentId){
        var i,
            item = {
                id: node.id,
                type: node.type
            };

        if (node.name) item.name = node.name;
        if (node.fullname) item.fullname = node.fullname;
        if (parentId) item.parent = parentId;
        data.push(item);
        if (node.children){
            for (i = 0; i < node.children.length; i++){
                walk(node.children[i], node.id);
            }
        }
    };

walk(tree);

fs.writeFile(__dirname + '/../src/api-tree-data.twig', JSON.stringify({data: data}, null, 4) , function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('api-tree-data.twig written');
    }
});
