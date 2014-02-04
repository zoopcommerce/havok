define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Currency'
], function (registerSuite, assert, Currency) {
    registerSuite({
        name: 'havok/filter/Currency',

        filterTest: function (){
            var filter = new Currency;
            filter.currency = 'USD';

            var testArray = [
                [null, null],
                ['1', '1'],
                ['1.00', '1.0'],
                ['1.00', '1.00'],
                ['1.00', '1.000'],
                ['1.01', '1.008'],
                ['1.00', '1.002'],
                ['2.00', '1.995'],
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        }
    });
});
