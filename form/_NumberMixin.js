define([
    'dojo/_base/declare',
    'dojo/number'
],
function (
    declare,
    number
){
    // module:
    //    	havok/form/_NumberMixin

    return declare(
        [],
        {
            // summary:
            //      Mixin to provide localised number formatting.

            // _formatter: Function
            _formatter: number.format,

            // _parser: Function
            _parser: number.parse,

            blurFormat: function(/*Number*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Formats the value as a Number, according to constraints.
                // tags:
                //		protected
                if (value == undefined) return ''
                var formattedValue = this._formatter(value, constraints);
                if (formattedValue == null) return value
                return formattedValue;
            },

            focusFormat: function(/*Number*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Formats the value as a Number, according to constraints.
                // tags:
                //		protected
                var parsedValue = this._parser(value, constraints);
                if (isNaN(parsedValue)) return value
                return parsedValue;
            },

            parse: function(/*String*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Replaceable function to convert a formatted string to a number value
                // tags:
                //		protected extension
                return this._parser(value, constraints);
            }
        }
    );
});
