define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/config'
], function (registerSuite, assert, dojoConfig) {
    registerSuite({
        name: 'havok/config',

        testConfigMerge: function (){

            var deferred = this.async(5000);

            dojoConfig.merge = [
                'test/config/asset/Config1',
                'test/config/asset/Config2'
            ];

            require(['havok/config/ready!'], deferred.callback(function(){
                var expectedConfig = {
                    test1: {
                        base: 'Test1',
                        params: {
                            value1: 1,
                            value2: 22
                        }
                    },
                    test2: {
                        base: 'Test2',
                        params: {
                            value1: 1
                        }
                    },
                    test3: {
                        params: {
                            value1: 11
                        }
                    }
                }
                assert.deepEqual(expectedConfig, dojoConfig.configTest);

                //do cleanup
                delete(dojoConfig.merge);
                delete(dojoConfig.configTest);
            }))
        }
    });
});
