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
            templateString: '<${tag} data-dojo-attach-point="containerNode"></{tag}>',

            defaultTag: 'div',

            buildRendering: function(){

                if (!this.tag){
                    if (this.srcNodeRef){
                        this.tag = this.srcNodeRef.nodeName;
                    } else {
                        this.tag = this.defaultTag;
                    }
                }

                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create('div', {innerHTML: this.innerHTML});
                }

                this.inherited(arguments);
            }
        }
    );
});
