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
    //    	havok/widget/NavTab

    return declare(
        [NavBase],
        {
            // summary:
            //      Tab style list

            contextRequire: contextRequire,

            // baseClass: String
            baseClass: 'nav nav-tabs'
        }
    );
});
