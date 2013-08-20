define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
],
function (
    declare,
    domClass,
    WidgetBase,
    TemplatedMixin
){
    // module:
    //    	havok/widget/_WidgetBase

    return declare(
        [WidgetBase, TemplatedMixin],
        {

            //defaultClass: undefined,

            templateString: '<${tag} data-dojo-attach-point="containerNode"></{tag}>',

            buildRendering: function(){

                if (!this.tag){
                    if (this.srcNodeRef){
                        this.tag = this.srcNodeRef.nodeName;
                    } else {
                        this.tag = 'div'
                    }
                }

                this.inherited(arguments);

                if (this.defaultClass){
                    domClass.add(this.domNode, this.defaultClass);
                }
            }
        }
    );
});
