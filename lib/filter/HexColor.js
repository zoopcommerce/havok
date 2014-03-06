define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		havok/filter/HexColor

    return declare(
        [Base],
        {

            filter: function(value){
                if (value[0] != '#'){
                    value = '#' + value;
                }
                return value.toUpperCase();
            }
        }
    );
});
