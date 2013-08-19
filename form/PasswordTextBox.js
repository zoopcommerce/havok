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
    return declare(
        [ValidationTextBox],
        {
            templateString: '<input type="password" id="${id}" data-dojo-attach-point="textbox, focusNode"/>',

            validator: ['Required', 'Password']
        }
    );
});
