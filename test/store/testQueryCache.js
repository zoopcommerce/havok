define([
    'intern!object',
    'intern/chai!assert',
    'dojo/store/Memory',
    'havok/store/QueryCache'
], function (registerSuite, assert, Memory, QueryCache) {
    registerSuite({
        name: 'havok/store/QueryCache',

        testQueryCache: function (){

            var deferred = this.async(5000);

            var masterStore = new Memory({
                    idProperty: 'ref',
                    data: [
                        {ref: 'TN', name: 'Tennessee'},
                        {ref: 'VA', name: 'Virginia'},
                        {ref: 'WA', name: 'Washington'},
                        {ref: 'FL', name: 'Florida'},
                        {ref: 'CA', name: 'California'}
                    ]
                }),
                slaveStore = new Memory,
                store = new QueryCache(masterStore, slaveStore);

            //prime query cache
            store.query({name: 'Tennessee'});

            //now change underlying data
            masterStore.put({ref: 'TN', name: 'Altered'});

            store.query({name: 'Tennessee'}).then(deferred.rejectOnError(function(data){
                assert.equal('Tennessee', data[0].name);
                store.clearQueryCache();
                store.query({name: 'Tennessee'}).then(deferred.callback(function(data){
                    assert.equal(0, data.length);
                }))
            }))
        }
    });
});
