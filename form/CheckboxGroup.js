define([
    'dojo/_base/declare',
    'dojo/dom-attr',
    'dojo/dom-class',
    '../widget/CheckboxGroup',
    './_FormWidgetMixin'
],
function(
    declare,
    domAttr,
    domClass,
    CheckboxGroup,
    FormWidgetMixin
){
    // module:
    //		havok/form/CheckboxGroup

    return declare
    (
        [CheckboxGroup, FormWidgetMixin],
        {
            tag: 'span',

            startup: function(){
                this.inherited(arguments);

                this.watch('active', function(){
                    var value = {},
                        node,
                        id,
                        i;
                    for (i = 0; i < this.containerNode.children.length; i++){
                        node = this.containerNode.children[i];
                        if (domAttr.has(node, 'data-havok-store-id')){
                            id = domAttr.get(node, 'data-havok-store-id');
                        } else if (node.id) {
                            id = node.id;
                        } else {
                            id = i;
                        }
                        value[id] = domClass.contains(node, 'active');
                    }
                    this._set('value', value);
                });
            },

            _setValueAttr: function(value){
                if (typeof value == 'string'){
                    value = JSON.parse(value);
                }

                var active = [],
                    i;

                for (i in value){
                    if (value[i]){
                        active.push(i);
                    }
                }
                this.set('active', active);
            }
        }
    );
});
