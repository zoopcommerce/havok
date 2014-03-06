define([
    'dojo/_base/declare',
    './TextBox',
    './_NumberMixin'
],
function (
    declare,
    TextBox,
    NumberMixin
){
    // module:
    //    	havok/form/Number

    return declare(
        [TextBox, NumberMixin],
        {
            // summary:
            //      A textbox with localised number formatting.
        }
    );
});
