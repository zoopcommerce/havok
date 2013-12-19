define([
    'dojo/_base/declare',
    './ValidationTextBox',
    '../filter/HexColor',
    'mystique/HexColor'
],
function (
    declare,
    ValidationTextBox
){
    // module:
    //		havok/form/HexColor

    return declare(
        [ValidationTextBox],
        {
            // summary:
            //      A textbox for RGB color code input.

            prepend: '#',

            filter: 'HexColor',

            validator: 'HexColor',

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
