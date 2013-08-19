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
    return declare(
        [WidgetBase, TextBoxMixin, AppendageMixin],
        {
            templateString: '<input type="text" id="${id}" data-dojo-attach-point="textbox"/>'
        }
    );
});
