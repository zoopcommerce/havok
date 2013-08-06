define([
    'dojo/_base/declare',
    'dojo/_base/array',
    '../widget/CheckboxGroup',
    './_FormWidgetMixin'
],
function(
    declare,
    array,
    CheckboxGroup,
    FormWidgetMixin
){
    // module:
    //		havok/form/CheckboxGroup

    return declare
    (
        [CheckboxGroup, FormWidgetMixin],
        {
            startup: function(){
                this.inherited(arguments);

                this.watch('active', function(property, oldValue, newValue){
                    var value = {},
                        i;
                    array.forEach(this.store.data, function(storeItem){
                        for (i = 0; i < newValue.length; i++){
                            if (storeItem.id == newValue[i].id){
                                value[storeItem.id] = true;
                                break;
                            }
                        }
                        if (!value[storeItem.id]){
                            value[storeItem.id] = false;
                        }
                    });
                    this._set('value', value);
                });
            },

            _setValueAttr: function(value){
                var active = [];
                for (var i in value){
                    if (value[i]){
                        active.push(i);
                    }
                }
                this.set('active', active);
            }
        }
    );
});
