define([
    'dojo/_base/declare',
    'dojo/dom-class',
    '../widget/CheckboxGroup',
    './_FormWidgetMixin'
],
function(
    declare,
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
            // summary:
            //      Creates a group of checkboxes styles as buttons.

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
                        if (node.hasAttribute('data-havok-store-id')){
                            id = node.getAttribute('data-havok-store-id');
                        } else if (node.value) {
                            id = node.value;
                        } else if (node.id) {
                            id = node.id
                        } else {
                            id = i;
                        }
                        value[id] = domClass.contains(node, 'active');
                    }
                    this._set('value', value);
                });
                this.set('value', this.value);
            },

            _setValueAttr: function(value){
                if (typeof value == 'string'){
                    value = JSON.parse(value);
                }

                var active = [],
                    i,
                    node,
                    parent = this.containerNode;

                for (i in value){
                    if (value[i]){
                        if ((node = parent.querySelector('[data-havok-store-id=' + i + ']')) ||
                            (node = parent.querySelector('[value=' + i + ']')) ||
                            (node = parent.querySelector('[id=' + i + ']')) ||
                            (node = parent.children[i])
                        ) {
                            active.push(node);
                        }
                    }
                }
                this.set('active', active);
            }
        }
    );
});
