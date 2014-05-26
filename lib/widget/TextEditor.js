define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './_WidgetBase',
    './_WidgetsInTemplateMixin',
    'dojo/text!./template/TextEditor.html',
    './TextToolbar'
],
function (
    declare,
    lang,
    WidgetBase,
    WidgetsInTemplateMixin,
    template
){
    // module:
    //    	havok/widget/TextEditor

    return declare(
        [WidgetBase, WidgetsInTemplateMixin],
        {
            // summary:
            //      Rich text editor.

            // templateString: String
            templateString: template,

            /*=====
            // _observer: MutationObserver
            //      Watches for changes to the text being edited
            _observer: undefined,
            =====*/

            startup: function(){
                this.inherited(arguments);
                this._observer = new MutationObserver(lang.hitch(this, function(){
                    this._set('text', this.get('text'));
                }))
                this._observer.observe(this.containerNode, {childList: true, characterData: true, subtree: true});
            },

            _getTextAttr: function(){
                return this.containerNode.innerHTML;
            },

            _setTextAttr: function(value){
                if (value != this.containerNode.innerHTML){
                    this.containerNode.innerHTML = value;
                    this._set('text', value);
                }
            },

            destroy: function(){
                this._observer.disconnect();
                this.inherited(arguments);
            }
        }
    );
});
