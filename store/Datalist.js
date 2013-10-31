define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/has',
    'dojo/dom-attr',
    '../string',
    'dojo/store/Memory'
],
function(
    declare,
    array,
    has,
    domAttr,
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
                    params.idProperty = domAttr.get(srcNodeRef, 'id-property');
                    params.id = srcNodeRef.id;

                    var i,
                        j,
                        attributes,
                        attribute,
                        node,
                        item;

                    for(i = 0; i < srcNodeRef.children.length; i++){
                        node = srcNodeRef.children[i];
                        item = {};

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

                        params.data.push(item);
                    }
                }

                this.inherited(arguments, [params]);
            }
        }
    );
});