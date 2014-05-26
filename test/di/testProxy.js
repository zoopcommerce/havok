define([
    'intern!object',
    'intern/chai!assert',
    'havok/lang',
    'dojo/_base/config',
    'test/di/asset/config'
], function (registerSuite, assert, lang, dojoConfig, testConfig) {
    registerSuite({
        name: 'havok/proxy',

        testProxy: function (){

            var deferred = this.async(5000);

            lang.mixinDeep(dojoConfig, testConfig);

            require(['havok/proxy!zooWithProxyMethods'], deferred.rejectOnError(function(zoo){
                zoo.listAnimals().then(deferred.callback(function(animals){
                    assert.deepEqual(['lucy', 'liz', 'toby'], animals);

                    //cleanup
                    for(var i in dojoConfig.di) delete(dojoConfig.di[i])
                }));
            }))
        }
    })
})