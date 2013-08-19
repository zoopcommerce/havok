define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_TextBoxMixin'
],
function (
    declare,
    WidgetBase,
    TextBoxMixin
){
    return declare(
        [WidgetBase, TextBoxMixin],
        {
            templateString: '<textarea data-dojo-attach-point="focusNode, containerNode, textbox" autocomplete="off"></textarea>',

            buildRendering: function(){
                this.inherited(arguments);
                this.styleNode = this.domNode;
            },

            postCreate: function(){
                this.set('value', this.textbox.value);
                this.inherited(arguments);
            }
        }
    );
});
