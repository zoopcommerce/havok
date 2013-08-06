define([
    'dojo/_base/declare'
],
function(
    declare
){
    return declare(
        [],
        {
            minSeverity: 0,

            render: function(exceptionModel){
                console.error('Exception caught and rendered');
                console.dir(exceptionModel);
            }
        }
    );
});
