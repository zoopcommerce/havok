define([
    'mystique/Base',
    'mystique/Result',
    'dojo/i18n!../nls/validator'
],
function(
    Base,
    Result,
    messages
){
    // module:
    //		havok/validator/Currency
    return Base.extend({

        _isValid: function(value){

            // summary:
            //      Note that this validator isn't much good for general purpose currency
            //      checking. It is designed to work in concert with the Currency
            //      filter and the CurrencyTextbox.

            var result = new Result({value: true});

            if (isNaN(value) && typeof value != 'undefined'){
                result.set('value', false);
                result.addMessage(messages.currency);
            }

            return result;
        }
    });
});