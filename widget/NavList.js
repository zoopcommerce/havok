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
            baseClass: 'nav nav-list'
        }
    );
});
