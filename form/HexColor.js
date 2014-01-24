define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    '../filter/HexColor',
    'mystique/HexColor'
],
function (
    declare,
    TextBox,
    ValidationMixin
){
    // module:
    //		havok/form/HexColor

    return declare(
        [TextBox, ValidationMixin],
        {
            // summary:
            //      A textbox for RGB color code input.

            prepend: '#',

            filter: 'HexColor',

            validator: ['HexColor'],

            delay: 50,

            blurFormat: function(value){
                //remove leading hash
                if (value[0] == '#'){
                    value = value.substr(1);
                }

                return value;
            }
        }
    );
});
