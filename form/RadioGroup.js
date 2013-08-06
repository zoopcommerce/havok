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

            startup: function(){
                this.inherited(arguments);

                this.watch('active', function(property, oldValue, newValue){
                    this._set('value', newValue.id);
                });
            },

            _setValueAttr: function(value){
                this.set('active', value);
            }
        }
    );
});
