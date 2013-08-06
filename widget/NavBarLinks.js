define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_NavBase',
    'dojo/text!./template/NavBarLinksDivider.html'
],
function (
    declare,
    domClass,
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
