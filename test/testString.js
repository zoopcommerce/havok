define([
    'intern!object',
    'intern/chai!assert',
    'havok/string'
], function (registerSuite, assert, string) {
    registerSuite({
        name: 'havok/string',

        ucFirstTest: function () {
            assert.strictEqual('Test', string.ucFirst('test'));
        },

        camelCaseTest: function() {
            assert.strictEqual('testString', string.camelCase('test-string'));
            assert.strictEqual('test', string.camelCase('Test'));
        }
    });
});