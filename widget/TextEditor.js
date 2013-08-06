define([
    'dojo/_base/declare',
    './_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./template/TextEditor.html',
    './TextToolbar'
],
function (
    declare,
    WidgetBase,
    WidgetsInTemplateMixin,
    template
){
    // module:
    //    	havok/widget/TextEditor

    return declare(
        [WidgetBase, WidgetsInTemplateMixin],
        {
            templateString: template,

            buildRendering: function(){
                this.inherited(arguments);
                this.toolbar.set('target', this.containerNode);
            },

            _getTextAttr: function(){
                return this.containerNode.innerHTML;
            },

            _setTextAttr: function(value){
                this.containerNode.innerHTML = value;
                this._set('text', value);
            }
        }
    );
});
