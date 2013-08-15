define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_TextBoxMixin',
    'dojo/text!./template/Textarea.html'
],
function (
    declare,
    WidgetBase,
    TextBoxMixin,
    template
){
    return declare(
        [WidgetBase, TextBoxMixin],
        {
            templateString: template,

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
