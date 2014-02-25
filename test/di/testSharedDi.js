define([
    'intern!object',
    'intern/chai!assert',
    'dojo/when'
], function (registerSuite, assert, when) {
    registerSuite({
        name: 'havok/di/sharedDi',

        testSharedDi: function (){

            var deferred = this.async(5000);

            require(['havok/di/sharedDi!'], deferred.rejectOnError(function(sharedDi){
                when(sharedDi.get('test/di/asset/Zoo'), deferred.callback(function(zoo){
                    assert.equal('the havok zoo', zoo.name);
                }));
            }))
        }
    })
})