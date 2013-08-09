define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    '../widget/TextEditor',
    './_FormWidgetMixin',
    './_FilterMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    '../less!./less/texteditor.less',
    '../filter/CleanHTML'
],
function (
    declare,
    lang,
    when,
    TextEditor,
    ValidationMixin,
    ValidationMessagesMixin,
    FormWidgetMixin,
    FilterMixin
){
    return declare(
        [TextEditor, FormWidgetMixin, FilterMixin, ValidationMixin, ValidationMessagesMixin],
        {

            // Apply CleanHTML filter by default
            filter: 'CleanHTML',

            buildRendering: function(){
                this.inherited(arguments);
                this.styleNode = this.domNode;
            },

            startup: function(){

                this.inherited(arguments);

                var value = this.get('value');
                if (value){
                    this.set('text', value);
                } else {
                    this.set('value', this.get('text'));
                }
                this.watch('text', lang.hitch(this, function(property, oldValue, newValue){
                    this.set('value', newValue);
                }))
            },

            _setValueAttr: function(value){
                this.set('text', value);

                when(this.applyFilter(value), lang.hitch(this, function(filteredValue){
                    this._set('value', filteredValue);
                }))
            }
        }
    );
});
