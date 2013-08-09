define([
    'dojo/_base/declare',
    './_NavBase',
    'dojo/text!./template/NavBarLinksDivider.html'
],
function (
    declare,
    NavBase,
    NavBarLinksDivider
){
    // module:
    //    	havok/widget/NavBarLinks

    return declare(
        [NavBase],
        {
            dividerTemplate: NavBarLinksDivider
        }
    );
});
