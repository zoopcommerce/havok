define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin'
],
function (
    declare,
    TextBox,
    ValidationMixin
){
    // module:
    //    	havok/form/ValidationTextBox

    return declare(
        [TextBox, ValidationMixin],
        {
            // summary:
            //      A textbox with validation.
        }
    );
});
