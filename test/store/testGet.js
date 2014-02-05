define([
    'intern!object',
    'intern/chai!assert',
    'havok/lang',
    'dojo/store/Memory',
    'dojo/_base/config'
], function (registerSuite, assert, lang, Memory, dojoConfig) {
    registerSuite({
        name: 'havok/store/get',

        testGetStoreFromDi: function (){

            var deferred = this.async(5000);

            lang.mixinDeep(dojoConfig, {
                di: {
                    stores: {
                        proxies: {
                            statesStore: new Memory({
                                idProperty: 'ref',
                                data: [
                                    {ref: 'TN', name: 'Tennessee'},
                                    {ref: 'VA', name: 'Virginia'},
                                    {ref: 'WA', name: 'Washington'},
                                    {ref: 'FL', name: 'Florida'},
                                    {ref: 'CA', name: 'California'}
                                ]
                            })
                        }
                    }
                }
            })

            require(['havok/store/get!statesStore'], deferred.callback(function(statesStore){
                assert.isObject(statesStore);
                assert.equal('Tennessee', statesStore.get('TN').name);

                //do cleanup
                delete(dojoConfig.di.stores)
            }))
        }
    });
});
