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
            //This is a really basic empty dropdown.
            //

            baseClass: 'dropdown-menu dropdown-container'
        }
    );
});
