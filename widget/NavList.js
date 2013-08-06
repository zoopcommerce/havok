define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_NavBase'
],
function (
    declare,
    domClass,
    NavBase
){
    // module:
    //    	havok/widget/NavList

    return declare(
        [NavBase],
        {
            buildRendering: function(){

                this.inherited(arguments);
                domClass.add(this.containerNode, 'nav-list');
            }
        }
    );
});
