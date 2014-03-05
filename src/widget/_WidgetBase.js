define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    './_HandlersMixin'
],
function (
    declare,
    domConstruct,
    WidgetBase,
    TemplatedMixin,
    HandlersMixin
){
    // module:
    //    	havok/widget/_WidgetBase

    return declare(
        [WidgetBase, TemplatedMixin, HandlersMixin],
        {
            searchContainerNode: false,

            dir: 'ltr',

            tag: 'div',

            templateString: '<${tag} data-dojo-attach-point="containerNode"></${tag}>',

            /*=====
            // innerHTML: String
            innerHTML: undefined,
            =====*/

            buildRendering: function(){

                if (this.srcNodeRef) {
                    if (this._rendered) this.tag = this.srcNodeRef.tagName;
                    if (this.srcNodeRef.hasAttribute('class')) this.baseClass += ' ' + this.srcNodeRef.getAttribute('class');
                } else if (this.innerHTML){
                    this.srcNodeRef = domConstruct.create('span', {innerHTML: this.innerHTML});
                }

                this.inherited(arguments);
            }
        }
    );
});
