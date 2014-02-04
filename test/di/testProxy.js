define([
    'intern!object',
    'intern/chai!assert',
    'havok/di/sharedDi',
    'dojo/_base/config',
    'havok/test/di/asset/config'
], function (registerSuite, assert, sharedDi, dojoConfig, testConfig) {
    registerSuite({
        name: 'havok/proxy',

        testProxy: function (){

            var deferred = this.async(5000);

            sharedDi.clear();
            dojoConfig.di = testConfig.di;

            require(['havok/proxy!zooWithProxyMethods'], deferred.rejectOnError(function(zoo){
                zoo.listAnimals().then(deferred.callback(function(animals){
                    assert.deepEqual(['lucy', 'liz', 'toby'], animals);
                    delete(dojoConfig.di);
                }));
            }))
        }
    })
})