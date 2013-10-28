define([
    'dojo/_base/declare',
    './_NavBase'
],
function (
    declare,
    NavBase
){
    // module:
    //    	havok/widget/NavPill

    return declare(
        [NavBase],
        {
            baseClass: 'nav nav-pills'
        }
    );
});
