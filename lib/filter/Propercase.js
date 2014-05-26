define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		havok/filter/Propercase

    return declare(
        [Base],
        {

            filter: function(value){
                return value.replace(/[^\s]+/g, function(word){
                    return word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase();
                });
            }
        }
    );
});
