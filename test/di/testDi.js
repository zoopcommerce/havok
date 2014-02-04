define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/when',
    'havok/di/Di',
    'havok/di/Proxy',
    'havok/test/di/asset/config'
], function (registerSuite, assert, lang, when, Di, Proxy, config) {
    registerSuite({
        name: 'havok/di/Di',

        configTest: function (){

            var startingConfig = {
                testButton: {
                    base: 'my/module',
                    params: {
                        label: 'Test Button'
                    }
                }
            };

            var customConfig = {
                testButton: {
                    base: 'my/module',
                    params: {
                        showLabel: false
                    }
                }
            };

            var mergedConfig = {
                testButton: {
                    base: 'my/module',
                    params: {
                        label: 'Test Button',
                        showLabel: false
                    }
                }
            }

            var changedConfig = {
                base: 'my/module',
                params: {
                    label: 'changed'
                }
            };

            var di = new Di(startingConfig);

            assert.deepEqual(startingConfig, di.getConfig());

            di.mergeConfig(customConfig);
            assert.deepEqual(mergedConfig, di.getConfig());

            assert.deepEqual(mergedConfig.testButton, di.getIdentifierConfig('testButton'));

            di.setIdentifierConfig('testButton', changedConfig);
            assert.deepEqual(changedConfig, di.getIdentifierConfig('testButton'));
        },

        noConfigTest: function (){

            var di = new Di();
            var deferred = this.async(5000);
            var zoo;

            // get with no config - just module name
            when(di.get('havok/test/di/asset/Zoo'), deferred.rejectOnError(function(zoo){
                assert.equal('the havok zoo', zoo.name);
                zoo.name = 'other zoo';

                // get- should return cached Zoo cached with modified name
                when(di.get('havok/test/di/asset/Zoo'), deferred.rejectOnError(function(zoo){
                    assert.equal('other zoo', zoo.name);

                    di.clearCache();

                    //should return new instance of Zoo - with original name
                    when(di.get('havok/test/di/asset/Zoo'), deferred.callback(function(zoo){
                        assert.equal('the havok zoo', zoo.name);
                    }));
                }));
            }));
        },

        noBaseTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('havok/test/di/asset/Penguin'), deferred.callback(function(penguin){
                assert.equal('kate', penguin.name);
            }));
        },

        baseSetTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('zooWithBase'), deferred.callback(function(zoo){
                assert.equal('the havok zoo', zoo.name);
            }));
        },

        identifierBaseTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('zooIdentifierBase'), deferred.callback(function(zoo){
                assert.equal('the havok zoo', zoo.name);
            }));
        },

        objectBaseTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('objectBase'), deferred.callback(function(object){
                assert.equal('alan', object.name);
            }));
        },

        paramsTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('zooParams'), deferred.callback(function(zoo){
                assert.equal('Zoo with param', zoo.name);
            }));
        },

        params2Test: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('foodsParams'), deferred.callback(function(food){
                assert.equal('fish', food.penguin);
                assert.equal('beef', food.lion);
                assert.equal('grubs', food.meerkat);
            }));
        },

        declareFalseTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('zooDeclareFalse'), deferred.callback(function(zoo){
                assert.equal('Zoo instance', zoo.name);
            }));
        },

        declareTrueTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('ZooDeclareTrue'), deferred.callback(function(Zoo){

                var zoo = new Zoo;

                assert.equal('Zoo extended', zoo.name);
                zoo.name = 'Zoo changed';

                var zoo2 = new Zoo;
                assert.equal('Zoo changed', zoo.name);
                assert.equal('Zoo extended', zoo2.name);
            }));
        },

        cacheTrueTest: function (){
            var di = new Di(config.di);

            var deferred = this.async(5000);

            when(di.get('zooCacheTrue'), deferred.rejectOnError(function(zoo){
                assert.equal('Zoo cache true', zoo.name);
                zoo.name = 'Zoo changed';

                when(di.get('zooCacheTrue'), deferred.callback(function(cachedZoo){
                    assert.equal('Zoo changed', cachedZoo.name);
                }));
            }));
         },

         cacheFalseTest: function (){
             var di = new Di(config.di);

             var deferred = this.async(5000);

             when(di.get('zooCacheFalse'), deferred.rejectOnError(function(zoo){

                 assert.equal('Zoo cache false', zoo.name);
                 zoo.name = 'Zoo changed';

                 when(di.get('zooCacheFalse'), deferred.callback(function(cachedZoo){
                     assert.equal('Zoo cache false', cachedZoo.name);
                 }));
             }));
         }
    });
});