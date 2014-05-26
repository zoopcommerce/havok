define([
    'intern!object',
    'intern/chai!assert',
    'havok/array'
], function (registerSuite, assert, array) {
    registerSuite({
        name: 'havok/array',

        arraySubtractTest: function (){
            var removeFrom = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
            var removeValues = [2, 3];

            var result = array.subtract(removeFrom, removeValues);
            assert.deepEqual([1, 4, 5, 1, 4, 5], result);
        }
    });
});
