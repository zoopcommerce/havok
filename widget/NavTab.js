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
            // summary:
            //      Tab style list

            // baseClass: String
            baseClass: 'nav nav-tabs'
        }
    );
});
