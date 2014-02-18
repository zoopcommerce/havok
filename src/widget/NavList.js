define([
    'dojo/_base/declare',
    './_NavBase'
],
function (
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

            // baseClass: String
            baseClass: 'nav nav-list'
        }
    );
});
