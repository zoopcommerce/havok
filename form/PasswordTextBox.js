define([
    'dojo/_base/declare',
    './ValidationTextBox',
    'mystique/Required',
    'mystique/Password'
],
function (
    declare,
    ValidationTextBox
){
    // module:
    //		havok/form/PasswordTextBox

    return declare(
        [ValidationTextBox],
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
