define([
    'intern!object',
    'intern/chai!assert',
    'havok/lang',
    'dojo/store/Memory',
    'dojo/_base/config',
    'havok/store/manager'
], function (registerSuite, assert, lang, Memory, dojoConfig, storeManager) {
    registerSuite({
        name: 'havok/store/manager',

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

            require(['havok/store/manager!statesStore'], deferred.callback(function(statesStore){
                assert.isObject(statesStore);
                assert.equal('Tennessee', statesStore.get('TN').name);

                //do cleanup
                delete(dojoConfig.di.stores)
            }))
        },

        testAddStore: function(){

            var deferred = this.async(5000);

            var originalStore = new Memory({id: 0, text: 'hello'});
            storeManager.add('test', originalStore).then(deferred.rejectOnError(function(){
                storeManager.get('test').then(deferred.callback(function(store){
                    assert.strictEqual(originalStore, store);
                }))
            }))
        }
    });
});
