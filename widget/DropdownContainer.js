define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_DropdownBase'
],
function (
    declare,
    domClass,
    DropdownBase
){
    // module:
    //    	havok/widget/DropdownContainer

    return declare(
        [DropdownBase],
        {

            //This is a really basic empty dropdown.
            //

            buildRendering: function(){

                this.inherited(arguments);

                domClass.add(this.domNode, 'dropdown-container');
            }
        }
    );
});
