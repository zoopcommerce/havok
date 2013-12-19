define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/focus',
    '../widget/_WidgetBase',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    'dojo/text!./template/ColorPicker.html',
    '../widget/DropdownToggle',
    '../widget/ColorDropdown'
],
function (
    declare,
    lang,
    focus,
    WidgetBase,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    template
){
    return declare([WidgetBase, WidgetsInTemplateMixin, FormWidgetMixin],
        {

            //value: undefined,

            templateString: template,

            startup: function(){

                this.inherited(arguments);

                this.dropdown.watch('value', lang.hitch(this, function(p, o, n){
                    this.set('value', n);
                }));
                this.dropdownToggle.watch('hidden', lang.hitch(this, function(p, o, n){
                    this.dropdown.set('value', this.value);
                }));
            },

            _setValueAttr: function(value){

                //update the swatch
                this.swatch.style.backgroundColor = value;

                this.dropdown.set('value', value);
                this._set('value', value);
            }
        }
    );
});
