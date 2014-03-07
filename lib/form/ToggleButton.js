define([
    'dojo/_base/declare',
    'dojo/dom-class',
    '../widget/ToggleButton',
    './_FormWidgetMixin'
],
function(
    declare,
    domClass,
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

            buildRendering: function(){
                this.inherited(arguments);

                domClass.remove(this.domNode, this.baseClass);
                domClass.add(this.button, this.baseClass);
            },

            _setActiveAttr: function(){
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
