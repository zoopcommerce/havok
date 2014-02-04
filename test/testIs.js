define([
    'intern!object',
    'intern/chai!assert',
    'havok/is'
], function (registerSuite, assert, is) {
    registerSuite({
        name: 'havok/is',

        isIntTest: function (){
            assert.isTrue(is.isInt(1));
            assert.isTrue(is.isInt(1.0));
            assert.isTrue(is.isInt('1'));
            assert.isFalse(is.isInt(true));
            assert.isFalse(is.isInt(false));
            assert.isFalse(is.isInt(1.5));
        },

        isFloatTest: function (){
            assert.isTrue(is.isFloat(1));
            assert.isTrue(is.isFloat(1.0));
            assert.isTrue(is.isFloat(1.5));
            assert.isTrue(is.isFloat(0));
            assert.isTrue(is.isFloat('0'));
            assert.isTrue(is.isFloat('1'));
            assert.isTrue(is.isFloat('1.5'));
            assert.isFalse(is.isFloat(true));
            assert.isFalse(is.isFloat(false));
            assert.isFalse(is.isFloat('one point five'));
        },

        isStatic: function (){
            var value;

            value = 1;
            assert.isTrue(is.isStatic(value));

            value = 'asdf';
            assert.isTrue(is.isStatic(value));

            value = {
                a: 1,
                b: 'asdf',
                c: {
                    d: 2
                }
            };
            assert.isTrue(is.isStatic(value));

            value = function(){};
            assert.isFalse(is.isStatic(value));

            value = {
                a: 1,
                b: 'asdf',
                c: {
                    d: function(){}
                }
            };
            assert.isFalse(is.isStatic(value));
        }
    });
});
