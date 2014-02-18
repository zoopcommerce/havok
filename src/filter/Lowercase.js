define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		havok/filter/Lowercase

    return declare(
        [Base],
        {

            filter: function(value){
                return value.toLowerCase();
            }
        }
    );
});
