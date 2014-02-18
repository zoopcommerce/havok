define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    'mystique/Required',
    'mystique/Password'
],
function (
    declare,
    TextBox,
    ValidationMixin
){
    // module:
    //		havok/form/Password

    return declare(
        [TextBox, ValidationMixin],
        {
            // summary:
            //      A textbox for imputting a password.

            // templateString: String
            templateString: '<input type="password" id="${id}" data-dojo-attach-point="input, focusNode"/>',

            // validator: String|String[]|Object|mystique/Base
            validator: ['Required', 'Password']
        }
    );
});
