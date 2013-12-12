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
    //    	havok/widget/NavBarLinks

    return declare(
        [NavBase],
        {
            // summary:
            //      List of links inside a NavBar

            contextRequire: contextRequire,
            
            // dividerTemplate: String
            dividerTemplate: '<li class="divider-vertical"></li>'
        }
    );
});
