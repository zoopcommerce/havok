define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/xhr',
    'dojo/domAttr',
    'dojo/store/Memory'
],
function(
    declare,
    lang,
    xhr,
    domAttr,
    Memory
){
    return declare (
        [Memory],
        {
            constructor: function(params, srcNodeRef){
                if (srcNodeRef){
                    params.idProperty = domAttr.get(srcNodeRef, 'id-property');
                    params.id = srcNodeRef.id;
                    for(var i = 0; i < srcNodeRef.children.length; i++){

                    }
                }
            }
        }
    );
});