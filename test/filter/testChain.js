define([
    'intern!object',
    'intern/chai!assert',
    'havok/filter/Trim',
    'havok/filter/Uppercase',
    'havok/filter/Chain',
    'test/filter/asset/DeferredFilter'
], function (registerSuite, assert, Trim, Uppercase, Chain, DeferredFilter) {
    registerSuite({
        name: 'havok/filter/Chain',

        filterTest: function (){

            var filter = new Chain({filters: [
                new Trim,
                new Uppercase
            ]});

            var testArray = [
                ['AB CD', 'ab cd'],
                ['ABCD', '  abcd   ']
            ];

            var index;
            for (index in testArray){
                assert.equal(testArray[index][0], filter.filter(testArray[index][1]));
            }
        },

        deferredFilterTest: function (){

            var deferred = this.async(5000);

            var filter = new Chain({filters: [
                new DeferredFilter,
                new Uppercase
            ]});

            filter.filter('awesome').then(deferred.callback(function(value){
                assert.equal('PROCESSEDAWESOME', value);
            }));
        }
    });
});
