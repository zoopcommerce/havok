define([
    'dojo/_base/declare',
    './Textarea',
    './_ValidationMixin',
    './_ValidationMessagesMixin'
],
function (
    declare,
    Textarea,
    ValidationMixin,
    ValidationMessagesMixin
){
    // module:
    //    	havok/form/ValidationTextarea

    return declare(
        [Textarea, ValidationMixin, ValidationMessagesMixin],
        {
            // summary:
            //      A textarea with validation.
        }
    );
});
