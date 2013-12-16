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
    // module:
    //		havok/form/EmailTextBox

    return declare(
        [ValidationTextBox],
        {
            // summary:
            //      A textbox for email input.

            // prepend: String|String[]|DomNode|DomNode[]
            prepend: '<i class="icon-envelope"></i>',

            // validator: String|String[]|Object|mystique/Base
            validator: ['Required', 'Email']
        }
    );
});
