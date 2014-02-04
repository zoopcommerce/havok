define([
    'intern!object',
    'intern/chai!assert',
    'havok/lang'
], function (registerSuite, assert, lang) {
    registerSuite({
        name: 'havok/lang',

        mixinDeepTest: function () {

            var dest = {
                item: {
                    a: 1,
                    b: {bb: 1}
                }
            };
            var source = {
                item: {
                    a: 0,
                    b: {dd: 5},
                    c: 3
                }
            }
            var result = {
                item: {
                    a: 0,
                    b: {bb: 1, dd:5},
                    c: 3
                }
            }
            assert.deepEqual(result, lang.mixinDeep(dest, source));
        },

        countPropertiesTest: function (){

            var object = {
                prop1: 1,
                prop2: [2, ,3],
                prop3: {three: 3}
            };

            assert.equal(3, lang.countProperties(object));
        }

    });
});
