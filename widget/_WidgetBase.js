define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
],
function (
    declare,
    domConstruct,
    WidgetBase,
    TemplatedMixin
){
    // module:
    //    	havok/widget/_WidgetBase

    return declare(
        [WidgetBase, TemplatedMixin],
        {
            dir: 'ltr',
            
            tag: 'div',

            templateString: '<${tag} data-dojo-attach-point="containerNode"></${tag}>',

            buildRendering: function(){

                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create('span', {innerHTML: this.innerHTML});
                }

                this.inherited(arguments);
            }
        }
    );
});
