define([
    'dojo/_base/declare',
    'dojo/dom-construct'
],
function (
    declare,
    domConstruct
){
    // module:
    //    	havok/form/_LabelMixin

    return declare(
        [],
        {
            // summary:
            //      Adds a label to form inputs

            /*=====
            // label: String
            label: undefined,
            =====*/

            /*=====
            // labelNode: DomNode
            labelNode: undefined,
            =====*/

            buildRendering: function(){

                var srcLabelNode,
                    label;

                if (this.srcNodeRef && (srcLabelNode = this.srcNodeRef.querySelector('LABEL'))){
                    label = srcLabelNode.innerHTML;
                }

                this.inherited(arguments);

                if (label) this.set('label', label)
            },

            _setLabelAttr: function(value) {
                this.label = value;

                if (this.labelNode) {
                    this.labelNode.innerHTML = value;
                    return;
                }

                this.labelNode = domConstruct.create(
                    'label',
                    {innerHTML: value, 'class': 'control-label', 'for': this.id, 'data-dojo-attach-point': 'labelNode'},
                    this.domNode,
                    'first'
                );
            }
        }
    );
});
