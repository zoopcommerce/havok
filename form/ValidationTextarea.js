define([
    'dojo/_base/declare',
    './Textarea',
    './_ValidationMixin'
],
function (
    declare,
    Textarea,
    ValidationMixin
){
    // module:
    //    	havok/form/ValidationTextarea

    return declare(
        [Textarea, ValidationMixin],
        {
            // summary:
            //      A textarea with validation.
        }
    );
});
