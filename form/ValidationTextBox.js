define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    './_ValidationMessagesMixin'
],
function (
    declare,
    TextBox,
    ValidationMixin,
    ValidationMessagesMixin
){
    // module:
    //    	havok/form/ValidationTextbox

    return declare(
        [TextBox, ValidationMixin, ValidationMessagesMixin],
        {
            // summary:
            //      A textbox with validation.
        }
    );
});
