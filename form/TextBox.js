define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_TextBoxMixin',
    './_AppendageMixin',
    'dojo/text!./template/TextBox.html'
],
function (
    declare,
    WidgetBase,
    TextBoxMixin,
    AppendageMixin,
    template
){
    return declare(
        [WidgetBase, TextBoxMixin, AppendageMixin],
        {
            templateString: template
        }
    );
});
