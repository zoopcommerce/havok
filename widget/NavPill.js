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
            // summary:
            //      Pill style list

            // baseClass: String
            baseClass: 'nav nav-pills'
        }
    );
});
