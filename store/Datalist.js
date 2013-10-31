define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/has',
    '../string',
    'dojo/store/Memory'
],
function(
    declare,
    array,
    has,
    string,
    Memory
){
    return declare (
        [Memory],
        {
            constructor: function(params, srcNodeRef){

                if (!params){
                    params = {};
                }

                if (!params.data){
                    params.data = [];
                }

                if (srcNodeRef){
                    params.id = srcNodeRef.id;

                    var id = 0,
                        process = function(nodes, parent){
                            var i,
                                j,
                                attributes,
                                attribute,
                                node,
                                item;

                            for(i = 0; i < nodes.length; i++){
                                node = nodes[i];
                                item = {id: id};
                                if (parent){
                                    item.parent = parent;
                                }
                                id++;

                                if(has("dom-attributes-explicit")){
                                    // Standard path to get list of user specified attributes
                                    attributes = node.attributes;
                                }else if(has("dom-attributes-specified-flag")){
                                    // Special processing needed for IE8, to skip a few faux values in attributes[]
                                    attributes = array.filter(node.attributes, function(a){
                                        return a.specified;
                                    });
                                }

                                j = 0;
                                while(attribute = attributes[j++]){
                                    item[string.camelCase(attribute.name)] = attribute.value;
                                }

                                if (node.nodeName == 'OPTGROUP'){
                                    item.type = 'group';
                                    params.data.push(item);
                                    process(node.children, item.id);
                                } else {
                                    item.label = node.innerHTML;
                                    params.data.push(item);
                                }
                            }
                        };

                    process(srcNodeRef.children);

//                    for(i = 0; i < srcNodeRef.children.length; i++){
//                        node = srcNodeRef.children[i];
//                        item = {text: node.innerHTML};
//
//                        if(has("dom-attributes-explicit")){
//                            // Standard path to get list of user specified attributes
//                            attributes = node.attributes;
//                        }else if(has("dom-attributes-specified-flag")){
//                            // Special processing needed for IE8, to skip a few faux values in attributes[]
//                            attributes = array.filter(node.attributes, function(a){
//                                return a.specified;
//                            });
//                        }
//
//                        j = 0;
//                        while(attribute = attributes[j++]){
//                            item[string.camelCase(attribute.name)] = attribute.value;
//                        }
//
//                        params.data.push(item);
//                    }
                }

                this.inherited(arguments, [params]);
            }
        }
    );
});