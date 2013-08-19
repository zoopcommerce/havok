define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_FormMixin'
],
function (
    declare,
    WidgetBase,
    FormMixin
){
    return declare(
        [WidgetBase, FormMixin],
        {
            templateString: '<form class="form-horizontal" data-dojo-attach-point="containerNode"></form>'
        }
    );
});
