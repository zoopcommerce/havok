define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Trim'
], function (registerSuite, assert, Trim) {
    registerSuite({
        name: 'havok/filter/Trim',

        filterTest: function (){
            var filter = new Trim;

            var testArray = [
                ['abcd', 'abcd'],
                ['abcd', ' abcd'],
                ['abcd', 'abcd '],
                ['ab cd', '  ab cd  '],
                ['ab\ncd', '\nab\ncd\n'],
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        }
    });
});
