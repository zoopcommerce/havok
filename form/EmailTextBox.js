define([
    'dojo/_base/declare',
    './ValidationTextBox',
    'mystique/Required',
    'mystique/Email'
],
function (
    declare,
    ValidationTextBox
){
    return declare(
        [ValidationTextBox],
        {

            prepend: '<i class="icon-envelope"></i>',

            validator: ['Required', 'Email']
        }
    );
});
