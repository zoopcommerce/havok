define([
    'dojo/_base/declare',
    './_NavBase'
],
function (
    declare,
    NavBase
){
    // module:
    //    	havok/widget/NavTab

    return declare(
        [NavBase],
        {
            baseClass: 'nav nav-tabs'
        }
    );
});
