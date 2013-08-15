define([
    'dojo/_base/declare',
    './ValidationTextBox',
    'dojo/text!./template/PasswordTextBox.html',
    'mystique/Required',
    'mystique/Password'
],
function (
    declare,
    ValidationTextBox,
    template
){
    return declare(
        [ValidationTextBox],
        {
            templateString: template,

            validator: ['Required', 'Password']
        }
    );
});
