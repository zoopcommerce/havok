define([
    'dojo/_base/declare',
    '../widget/ToggleButton',
    './_FormWidgetMixin'
],
function(
    declare,
    ToggleButton,
    FormWidgetMixin
){
    // module:
    //		havok/form/ToggleButton

    return declare
    (
        [ToggleButton, FormWidgetMixin],
        {
            value: false,

            _setActiveAttr: function(value){
                this.inherited(arguments);
                this._set('value', this.active);
            },

            _setValueAttr: function(value){
                this.set('active', value);
                this._set('value', value);
            },

            _getValueAttr: function(){
                return this.get('active');
            }
        }
    );
});
