define([
    'dojo/_base/declare',
    './_NavBase'
],
function (
    declare,
    NavBase
){
    // module:
    //    	havok/widget/NavBarLinks

    return declare(
        [NavBase],
        {
            dividerTemplate: '<li class="divider-vertical"></li>'
        }
    );
});
