define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    'mystique/Required',
    'mystique/Email'
],
function (
    declare,
    TextBox,
    ValidationMixin
){
    // module:
    //		havok/form/Email

    return declare(
        [TextBox, ValidationMixin],
        {
            // summary:
            //      A textbox for email input.

            // prepend: String|String[]|DomNode|DomNode[]
            prepend: '<i class="fa fa-envelope"></i>',

            // validator: String|String[]|Object|mystique/Base
            validator: ['Required', 'Email']
        }
    );
});
