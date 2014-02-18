define([
    'dojo/_base/declare',
    './_DropdownBase'
],
function (
    declare,
    DropdownBase
){
    // module:
    //    	havok/widget/DropdownContainer

    return declare(
        [DropdownBase],
        {
            // summary:
            //      A dropdown for displaying anything.

            baseClass: 'dropdown-menu dropdown-container'
        }
    );
});
