define ([],
function () {
    // module:
    //		havok/is
    //
    // summary:
    //      Provides boolean tests for values
    //

    return {

        isInt: function(value) {
            // summary:
            //		Checks if a value is an integer or can be cast into an integer

            return ((parseFloat(value) == parseInt(value)) && !isNaN(value));
        },

        isFloat: function(value) {
            // summary:
            //      Checks if a value is a float or can be cast into an integer

            return ((parseFloat(value) || parseInt(value) === 0) && !isNaN(value));
        },

        isStatic: function(/*object*/value){
            //summary:
            //     Helper method to determine if a value contains any functions.
            //     Returns true if it contains only static values.
            //     Returns false is it contains one or more functions.
            //
            // returns:
            //     boolean

            var isStatic = function(value){
                if (typeof value == 'function'){
                    return false;
                }
                if (typeof value == 'object'){
                    for(var property in value) {
                        if(value.hasOwnProperty(property) && ! isStatic(value[property])){
                            return false;
                        }
                    }
                }
                return true;
            }

            return isStatic(value);
        }
    }
});
