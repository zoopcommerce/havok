define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    'dojo/dom-attr',
    'dojo/query',
    './_TextBoxMixin'
],
function (
    declare,
    WidgetBase,
    domAttr,
    query,
    TextBoxMixin
){
    return declare(
        [WidgetBase, TextBoxMixin],
        {
            templateString: '<textarea data-dojo-attach-point="focusNode, textbox" autocomplete="off"></textarea>',

            buildRendering: function(){

                var nodeList,
                    textAreaSrcNode;

                if (this.srcNodeRef){
                    if (this.srcNodeRef.nodeName == 'TEXTAREA'){
                        textAreaSrcNode = this.srcNodeRef;
                    } else {
                        nodeList = query('TEXTAREA', this.srcNodeRef);
                        if (nodeList.length > 0){
                            textAreaSrcNode = nodeList[0];
                        }
                    }
                    if (!this.value){
                        this.value = textAreaSrcNode.innerHTML;
                    }
                    if (!this.rows){
                        this._rows = domAttr.get(textAreaSrcNode, 'rows');
                    }
                    if (!this.cols){
                        this._cols = domAttr.get(textAreaSrcNode, 'cols');
                    }
                }
                this.inherited(arguments);
                this.styleNode = this.domNode;

                if (this._rows){
                    this.textbox.rows = this._rows;
                    delete(this._rows);
                }
                if (this._cols){
                    this.textbox.cols = this._cols;
                    delete(this._cols);
                }
            },

            postCreate: function(){
                this.set('value', this.textbox.value);
                this.inherited(arguments);
            }
        }
    );
});
