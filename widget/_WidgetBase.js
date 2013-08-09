define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./template/WidgetBase.html'
],
function (
    declare,
    domClass,
    WidgetBase,
    TemplatedMixin,
    template
){
    // module:
    //    	havok/widget/_WidgetBase

    return declare(
        [WidgetBase, TemplatedMixin],
        {

            defaultClass: '',

            templateString: template,

            buildRendering: function(){

                if (!this.tag){
                    this.tag = 'div';
                }
                if (this.srcNodeRef){
                    this.tag = this.srcNodeRef.nodeName;
                }

                this.inherited(arguments);

                domClass.add(this.domNode, this.defaultClass);
            }
        }
    );
});
