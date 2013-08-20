define([
    'dojo/_base/declare',
    'dojo/dom-class',
    '../widget/RadioGroup',
    './_FormWidgetMixin'
],
function(
    declare,
    domClass,
    RadioGroup,
    FormWidgetMixin
){
    // module:
    //		havok/form/RadioGroup

    return declare
    (
        [RadioGroup, FormWidgetMixin],
        {

            tag: 'span',

            buildRendering: function(){

                this.inherited(arguments);

                if (this.defaultClass){
                    domClass.add(this.containerNode, this.defaultClass);
                }
            },

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
