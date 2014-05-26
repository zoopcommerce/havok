define([
    'intern!object',
    'intern/chai!assert',
    'havok/di/sharedDi'
], function (registerSuite, assert, sharedDi) {
    registerSuite({
        name: 'havok/get',

        testGet: function (){

            var deferred = this.async(5000);

            require(['havok/get!test/di/asset/Zoo'], deferred.callback(function(zoo){
                assert.equal('the havok zoo', zoo.name);
            }))
        }
    })
})