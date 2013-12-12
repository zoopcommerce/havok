define([
    'dojo/_base/declare',
    '../widget/RadioGroup',
    './_FormWidgetMixin'
],
function(
    declare,
    RadioGroup,
    FormWidgetMixin
){
    // module:
    //		havok/form/RadioGroup

    return declare
    (
        [RadioGroup, FormWidgetMixin],
        {
            // summary:
            //      Creates a radio group styles as buttons.

            tag: 'span',

            startup: function(){
                this.inherited(arguments);

                this.watch('active', function(property, oldValue, newValue){
                    var value;

                    if (!newValue){
                        value = null;
                    } else if (newValue.hasAttribute('data-havok-store-id')){
                        value = newValue.getAttribute('data-havok-store-id');
                    } else if (newValue.value) {
                        value = newValue.value;
                    } else if (newValue.id) {
                        value = newValue.id
                    }
                    this._set('value', value);
                });
                this.set('value', this.value);
            },

            _setValueAttr: function(value){

                var node,
                    parent = this.containerNode;

                if ((node = parent.querySelector('[data-havok-store-id=' + value + ']')) ||
                    (node = parent.querySelector('[value=' + value + ']')) ||
                    (node = parent.querySelector('[id=' + value + ']')) ||
                    (node = parent.children[value])
                ) {
                    this.set('active', node);
                } else {
                    this.set('active', null);
                }
            }
        }
    );
});
