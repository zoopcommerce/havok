define([
    'mystique/Base',
    'mystique/Result'
],
function(
    Base,
    Result
){
    return Base.extend({

        _isValid: function(value){

            var result = new Result({value: true});

            if (value.username1 != value.username2){
                result.set('value', false);
                result.addMessage('Username1 must be the same as Username2');
            }

            return result;
        }
    });
});
