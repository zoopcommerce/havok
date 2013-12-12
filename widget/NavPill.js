define([
    'require',
    'dojo/_base/declare',
    './_NavBase'
],
function (
    contextRequire,
    declare,
    NavBase
){
    // module:
    //    	havok/widget/NavPill

    return declare(
        [NavBase],
        {
            // summary:
            //      Pill style list

            contextRequire: contextRequire,
            
            // baseClass: String
            baseClass: 'nav nav-pills'
        }
    );
});
