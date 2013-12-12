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
    //    	havok/widget/NavList

    return declare(
        [NavBase],
        {
            // summary:
            //      Simple list

            contextRequire: contextRequire,

            // baseClass: String
            baseClass: 'nav nav-list'
        }
    );
});
