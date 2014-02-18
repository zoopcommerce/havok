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
            // summary:
            //      List of links inside a NavBar

            // dividerTemplate: String
            dividerTemplate: '<li class="divider-vertical"></li>'
        }
    );
});
