define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date/locale',
    './TextBox',
    './_ValidationMixin',
    '../widget/_WidgetsInTemplateMixin',
    'dojo/text!./template/Date.html',
    '../widget/DateDropdown',
    '../widget/DropdownToggle',
    'mystique/Date'
],
function (
    declare,
    lang,
    dateLocale,
    TextBox,
    ValidationMixin,
    WidgetsInTemplateMixin,
    template
){
    // module:
    //		havok/form/Date

    return declare(
        [TextBox, ValidationMixin, WidgetsInTemplateMixin],
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
            validator: ['Date'],

            /*=====
            // dropdown: DomNode
            dropdown: undefined,
            =====*/

            /*=====
            // dropdownToggle: DomNode
            dropdownToggle: undefined,
            =====*/

            startup: function(){
                this.inherited(arguments);
                this.addHandler(this.dropdownToggle.watch('hidden', lang.hitch(this, this._dropdownToggleWatcher)));
            },

            _setValueAttr: function(value){
                if (typeof value == 'string') value = new Date(value);
                this.inherited(arguments, [value]);
            },

            _dropdownToggleWatcher: function(property, oldValue, newValue){
                if (newValue){
                    this.set('value', this.dropdownToggle.dropdown.get('date'));
                    this.removeHandlers('date');
                } else {
                    var value = this.get('value');
                    if (value) this.dropdownToggle.dropdown.set('date', value);
                    this.addHandler(this.dropdownToggle.dropdown.watch('date', lang.hitch(this, function(){
                        this.dropdownToggle.hide()
                    })), 'date');
                }
            },

            blurFormat: function(value) {
                return value instanceof Date ?
                    dateLocale.format(value, {selector: 'date', formatLength: this.formatLength}) :
                    typeof value == 'undefined' ? '' : value;
            },

            focusFormat: function(value) {
                return value instanceof Date ?
                    dateLocale.format(value, {selector: 'date', formatLength: this.formatLength}) :
                    typeof value == 'undefined' ? '' : value;
            },

            parse: function(value){
                return value instanceof Date || typeof value == 'undefined' ?
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