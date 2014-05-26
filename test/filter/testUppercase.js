define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Uppercase'
], function (registerSuite, assert, Uppercase) {
    registerSuite({
        name: 'havok/filter/Uppercase',

        filterTest: function (){
            var filter = new Uppercase;

            var testArray = [
                ['ABCD', 'Abcd'],
                ['ABCD', 'aBcd'],
                ['ABCD', 'ABCD']
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        }
    });
});
