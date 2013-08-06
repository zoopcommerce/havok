define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_FormMixin',
    'dojo/text!./template/Form.html'
],
function (
    declare,
    WidgetBase,
    FormMixin,
    template
){
    return declare(
        [WidgetBase, FormMixin],
        {
            templateString: template
        }
    );
});
