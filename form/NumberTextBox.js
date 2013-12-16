define([
    'dojo/_base/declare',
    './TextBox',
    './_NumberTextBoxMixin'
],
function (
    declare,
    TextBox,
    NumberTextBoxMixin
){
    // module:
    //    	havok/form/NumberTextBox

    return declare(
        [TextBox, NumberTextBoxMixin],
        {
            // summary:
            //      A textbox with localised number formatting.
        }
    );
});
