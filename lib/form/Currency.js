define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/currency',
    '../is',
    './Number',
    './_ValidationMixin',
    '../validator/Currency',
    '../filter/Currency'
],
function (
    declare,
    lang,
    currency,
    is,
    Number,
    ValidationMixin
){
    // module:
    //		havok/form/Currency

    var currencyValidatorMid = 'havok/validator/Currency',
        currencyFilterMid = 'havok/filter/Currency';

    return declare(
        [Number, ValidationMixin],
        {
            // summary:
            //      A textbox with localised currency formatting.

            // currency: String
            //      The currency code
            //      Used to set the currency symbol on the textbox
            //      Defaults to `USD`
            currency: 'USD',

            // placeholder: Object
            placeholder: {format: 0},

            // _formatter: Function
            _formatter: currency.format,

            // _parser: Function
            _parser: currency.parse,

            // validator: String|String[]|Object|mystique/Base
            validator: [currencyValidatorMid],

            _setCurrencyAttr: function(/*String*/value){
                this.set('prepend', currency._mixInDefaults({currency: value}).symbol);
            },

            _setPlaceholderAttr: function(value){
                if (value.hasOwnProperty('format')){
                    value = this._formatter(value.format);
                }
                this.inherited(arguments, [value]);
            },

            blurFormat: function(/*Number*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Formats the value as a Number, according to constraints.
                // tags:
                //		protected
                if (value == '' || value == undefined || value == null){
                    return null;
                }

                return this.inherited(arguments);
            },

            parse: function(/*String*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Replaceable function to convert a formatted string to a number value
                // tags:
                //		protected extension

                if (value == '' || value == undefined || value == null){
                    return null;
                }
                if (is.isFloat(value)){
                    //if the value is already a plain numnber, it doesn't need to be parsed
                    return value;
                }
                return this.inherited(arguments);
            },

            _setValidatorAttr: function(value){

                if (!lang.isArray(value) && !value.isValid && value !== currencyValidatorMid){
                    value = [value];
                    value.push(currencyValidatorMid);
                }
                this.inherited(arguments, [value]);
            },

            _setFilterAttr: function(value){

                if (!lang.isArray(value) && !value.filter && value !== currencyFilterMid){
                    value = [value];
                    value.push(currencyFilterMid);
                }
                this.inherited(arguments, [value]);
            }
        }
    );
});

