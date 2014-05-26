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

    string.camelCase = function(value) {
        // summary:
        //     Takes a dash separated string and makes it camel case
        return value.toLowerCase().replace(/-([a-z])/gi, function(s, group1) {
            return group1.toUpperCase();
        })
    }

    return string;
});