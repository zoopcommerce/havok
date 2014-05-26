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

    // module:
    //		havok/store/Datalist

    return declare (
        [Memory],
        {
            // summary:
            //      Parses a `datalist` tag into data store
            // description:
            //      Allows data stores defined using markup.

            constructor: function(/*Object?*/params, /*DomNode*/srcNodeRef){
                // summary:
                //		Creates a memory data store from a `datalist` dom node.
                // returns: dojo/store/api/store

                params = params || {};
                params.data = params.data || [];

                if (srcNodeRef){
                    params.id = srcNodeRef.id;

                    var id = 0,
                        process = function(nodes, parent){
                            var i,
                                j,
                                attributes,
                                attribute,
                                node,
                                item,
                                value;
                            for(i = 0; i < nodes.length; i++){
                                node = nodes[i];
                                item = {id: id};
                                if (parent !== undefined){
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
                                    value = (attribute.value == '') ? true : attribute.value;

                                    if (attribute.name == 'value'){
                                        item.id = value;
                                    } else if (attribute.name.indexOf('data-') == 0){
                                        item[string.camelCase(attribute.name.slice(5))] = value;
                                    } else {
                                        item[string.camelCase(attribute.name)] = value;
                                    }
                                }

                                if (node.tagName == 'D-GROUP'){
                                    item.type = 'group';
                                    params.data.push(item);
                                    process(node.children, item.id);
                                } else {
                                    item.text = node.innerHTML;
                                    params.data.push(item);
                                }
                            }
                        };

                    process(srcNodeRef.children);
                }
                
                this.inherited(arguments, [params]);
            }
        }
    );
});