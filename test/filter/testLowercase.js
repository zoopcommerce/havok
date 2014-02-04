define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Lowercase'
], function (registerSuite, assert, Lowercase) {
    registerSuite({
        name: 'havok/filter/Lowercase',

        filterTest: function (){
            var filter = new Lowercase;

            var testArray = [
                ['abcd', 'Abcd'],
                ['abcd', 'aBcd'],
                ['abcd', 'ABCD']
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        }
    });
});
