define ([
    'dojo/string'
],
function (string) {
    // module:
    //		havok/string
    //
    // summary:
    //      Extends dojo/string with extra functions
    //

    string.ucFirst = function(value) {
        // summary:
        //		Makes the first letter of a string uppercase

        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return string;
});