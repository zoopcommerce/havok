define([
    'dojo/_base/declare',
    '../is',
    'dojo/Stateful'
],
function(
    declare,
    is,
    Stateful
){
    // module:
    //		havok/filter/Base

    var Base = declare(
        [Stateful],
        {
        }
    );

    is.isFilter = function(filter){
        //summary:
        //     Extend havok/is with helper method to determine if a filter is an instance of Base filter
        //
        // returns:
        //     boolean

        if (filter && filter.isInstanceOf && filter.isInstanceOf(Base)){
            return true;
        }
        return false;
    }

    return Base;
});
