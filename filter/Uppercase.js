define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		havok/filter/Uppercase

    return declare(
        [Base],
        {

            filter: function(value){
                return value.toUpperCase();
            }
        }
    );
});
