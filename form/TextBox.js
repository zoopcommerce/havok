define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_TextBoxMixin',
    './_AppendageMixin'
],
function (
    declare,
    WidgetBase,
    TextBoxMixin,
    AppendageMixin
){
    // module:
    //    	havok/form/Textbox

    return declare(
        [WidgetBase, TextBoxMixin, AppendageMixin],
        {
            // summary:
            //      A styled textbox for form input.

            // templateString: String
            templateString: '<input type="text" id="${id}" data-dojo-attach-point="input"/>'
        }
    );
});
