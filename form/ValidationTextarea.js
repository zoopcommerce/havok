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
    return declare(
        [Textarea, ValidationMixin],
        {
        }
    );
});
