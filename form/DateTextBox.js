define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date/locale',
    '../is',
    './ValidationTextBox',
    '../widget/_WidgetsInTemplateMixin',
    'dojo/text!./template/DateTextBox.html',
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
    // module:
    //		havok/form/DateTextBox

    return declare(
        [ValidationTextBox, WidgetsInTemplateMixin],
        {
            // summary:
            //      A textbox for date input.

            // templateString: String
            templateString: template,

            // formatLength: String
            //     Code to define date format length.
            //     Commonly used values are `short`, `medium` and `long`.
            //     See `dojo/cldr/nls` for more options.
            //     Defaults to `medium`.
            formatLength: 'medium',

            // placeholder: String
            placeholder: 'dd/mm/yyyy',

            // validator: String|String[]|Object|mystique/Base
            validator: 'Date',

            startup: function(){
                this.inherited(arguments);
                this.dropdownToggle.watch('hidden', lang.hitch(this, this._dropdownToggleWatcher));
            },

            _setValueAttr: function(value){
                if (typeof value == 'string') value = new Date(value);
                this.inherited(arguments, [value]);
            },

            _dropdownToggleWatcher: function(property, oldValue, newValue){

                var handle;

                if (newValue){
                    this.set('value', this.dropdown.get('date'));
                    if (handle) handle.unwatch();
                } else {
                    var value = this.get('value');
                    if (value) this.dropdown.set('date', value);
                    handle = this.dropdown.watch('date', lang.hitch(this, function(){
                        this.dropdownToggle.hide()
                    }))
                }
            },

            blurFormat: function(value) {
                return is.isDate(value) ?
                    dateLocale.format(value, {selector: 'date', formatLength: this.formatLength}) :
                    value;
            },

            focusFormat: function(value) {
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