define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Propercase'
], function (registerSuite, assert, Propercase) {
    registerSuite({
        name: 'havok/filter/Propercase',

        filterTest: function (){
            var filter = new Propercase;

            var testArray = [
                ['Abcd', 'abcd'],
                ['Abcd Efg', 'abcd efg'],
                ['Abcd Efg', 'abcD efG']
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        }
    });
});
