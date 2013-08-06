define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date/locale',
    '../is',
    './ValidationTextBox',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./Template/DateTextBox.html',
    '../widget/DateDropdown',
    '../widget/DropdownToggle',
    'mystique/Date'
],
function (
    declare,
    lang,
    dateLocale,
    is,
    ValidationTextBox,
    WidgetsInTemplateMixin,
    template
){
    return declare(
        [ValidationTextBox, WidgetsInTemplateMixin],
        {

            templateString: template,

            formatLength: 'medium', // short | medium | long and more. See dojo/cldr/nls

            placeholder: 'dd/mm/yyyy',

            validator: 'Date',

            startup: function(){
                this.inherited(arguments);
                this.dropdownToggle.watch('date', lang.hitch(this, '_dropdownWatcher'));
            },

            _dropdownWatcher: function(property, oldValue, newValue){
                this.set('value', newValue);
                this.dropdownToggle.hide();
            },

            blurFormat: function(value) {
                return is.isDate(value) ?
                    dateLocale.format(value, {selector: 'date', formatLength: this.formatLength}) :
                    value;
            },

            parse: function(value){
                return is.isDate(value) ?
                    value :
                    dateLocale.parse(value, lang.mixin({selector: 'date', formatLength: this.formatLength}));
            },

            _setValidatorAttr: function(value){

                if (!lang.isArray(value) && !value.isValid && value !== 'Date'){
                    value = [value];
                    value.push('Date');
                }
                this.inherited(arguments, [value]);
            }
        }
    );
});