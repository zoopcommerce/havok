define([
    'intern!object',
    'intern/chai!assert',
    'havok/validator/Currency'
], function (registerSuite, assert, Currency) {
    registerSuite({
        name: 'havok/filter/Currency',

        filterTest: function (){
            var validator = new Currency;

            var testArray = [
                [true, ''],
                [true, undefined],
                [true, null],
                [true, 0],
                [true, 0.1],
                [true, 0.11],
                [true, 0.111],
                [true, 1],
                [true, 1.1],
                [true, 1.11],
                [true, 1.111],
                [true, '0'],
                [true, '0.1'],
                [true, '0.11'],
                [true, '0.111'],
                [false, '0.0.111'],
                [false, '1.1.111'],
                [false, '$1.10'],
                [false, '1.a']
            ];

            var index;
            for (index in testArray){
                if (testArray[index][0]){
                    assert.isTrue(validator.isValid(testArray[index][1]).get('value'));
                } else {
                    assert.isFalse(validator.isValid(testArray[index][1]).get('value'));
                }
            }
        }
    });
});
