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
    // module:
    //    	havok/form/Form

    return declare(
        [WidgetBase, FormMixin],
        {
            // summary:
            //      Simple form

            // templateString: String
            templateString: '<form class="form-horizontal" data-dojo-attach-point="containerNode"></form>'
        }
    );
});
