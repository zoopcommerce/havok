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
    // module:
    //		havok/form/Textarea

    return declare(
        [WidgetBase, TextBoxMixin],
        {
            // summary:
            //      A textarea input.

            /*=====
            // textbox: DomNode
            //      Hook for dijit/form/_ExpandingTextAreaMixin
            textbox: undefined,
            =====*/

            // templateString: String
            templateString: '<textarea data-dojo-attach-point="focusNode, input" autocomplete="off"></textarea>',

            buildRendering: function(){

                var textAreaSrcNode;

                if (this.srcNodeRef){
                    if (!(textAreaSrcNode = this.srcNodeRef.querySelector('TEXTAREA'))) textAreaSrcNode = this.srcNodeRef;
                    if (!this.value) this.value = textAreaSrcNode.innerHTML;
                    if (!this.rows) this._rows = textAreaSrcNode.getAttribute('rows');
                    if (!this.cols) this._cols = textAreaSrcNode.getAttribute( 'cols');
                }
                this.inherited(arguments);

                this.textbox = this.input;

                this.styleNode = this.domNode;

                if (this._rows){
                    this.input.rows = this._rows;
                    delete(this._rows);
                }
                if (this._cols){
                    this.input.cols = this._cols;
                    delete(this._cols);
                }
            }
        }
    );
});
