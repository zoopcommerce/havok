define([
    'dojo/_base/declare',
    'dojo/query',
    'dojo/dom-construct'
],
function (
    declare,
    query,
    domConstruct
){
    return declare(
        [],
        {
            // Adds a label to form inputs
            //

            // label: string
            //label: undefined,

            buildRendering: function(){

                var nodeList,
                    label;

                if (this.srcNodeRef){
                    nodeList = query('LABEL', this.srcNodeRef);
                    if (nodeList.length > 0){
                        label = nodeList[0].innerHTML;
                    }
                }

                this.inherited(arguments);

                if (label){
                    this.set('label', label)
                }
            },

            _setLabelAttr: function(value) {
                this.label = value;

                if (this.labelNode) {
                    this.labelNode.innerHTML = value;
                    return;
                }

                this.labelNode = domConstruct.create(
                    'label',
                    {innerHTML: value, 'class': 'control-label', 'for': this.id},
                    this.domNode,
                    'first'
                );
            }
        }
    );
});
