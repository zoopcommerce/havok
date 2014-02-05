define([
    'intern!object',
    'intern/chai!assert',
    'dojo/DeferredList',
    'dojo/store/Memory',
    'havok/store/Throttle'
], function (registerSuite, assert, DeferredList, Memory, Throttle) {
    registerSuite({
        name: 'havok/store/Throttle',

        testThrottleGet: function (){

            var deferred = this.async(5000);

            var throttle = 500;

            var store = new Throttle(new Memory({
                idProperty: 'ref',
                data: [
                    {ref: 'TN', name: 'Tennessee'},
                    {ref: 'VA', name: 'Virginia'},
                    {ref: 'WA', name: 'Washington'},
                    {ref: 'FL', name: 'Florida'},
                    {ref: 'CA', name: 'California'}
                ]
            }), throttle);

            var request1 = store.get('TN'),
                request2 = store.get('VA'),
                time1,
                time2;

            request1.then(function(){
                time1 = new Date
            });
            request2.then(function(){
                time2 = new Date
            });

            (new DeferredList([request1, request2])).then(deferred.callback(function(){
                assert.operator(throttle, '<', (time2.getTime() - time1.getTime()) * 1.05);
            }));
        },

        testThrottleQuery: function(){
            var deferred = this.async(5000);

            var throttle = 500;

            var store = new Throttle(new Memory({
                idProperty: 'ref',
                data: [
                    {ref: 'TN', name: 'Tennessee'},
                    {ref: 'VA', name: 'Virginia'},
                    {ref: 'WA', name: 'Washington'},
                    {ref: 'FL', name: 'Florida'},
                    {ref: 'CA', name: 'California'}
                ]
            }), throttle);

            var request1 = store.query({name: 'Tennessee'}),
                request2 = store.query({name: 'Virginia'}),
                time1,
                time2;

            request1.then(function(){
                time1 = new Date
            });
            request2.then(function(){
                time2 = new Date
            });

            (new DeferredList([request1, request2])).then(deferred.callback(function(){
                assert.operator(throttle, '<', (time2.getTime() - time1.getTime()) * 1.05);
            }));
        },

        testThrottleAddRemove: function(){
            var deferred = this.async(5000);

            var throttle = 500;

            var innerStore = new Memory({
                    idProperty: 'ref',
                    data: [
                        {ref: 'TN', name: 'Tennessee'},
                        {ref: 'VA', name: 'Virginia'},
                        {ref: 'WA', name: 'Washington'},
                        {ref: 'FL', name: 'Florida'},
                        {ref: 'CA', name: 'California'}
                    ]
                }),
                store = new Throttle(innerStore, throttle);

            var request1 = store.add({ref: 'T', name: 'Test'}),
                request2 = store.remove('T'),
                time1,
                time2;

            request1.then(function(){
                time1 = new Date;
                assert.equal('Test', innerStore.get('T').name);
            });
            request2.then(function(){
                time2 = new Date;
                assert.isNull(innerStore.get('T'));
            });

            (new DeferredList([request1, request2])).then(deferred.callback(function(){
                assert.operator(throttle, '<', (time2.getTime() - time1.getTime()) * 1.05);
            }));
        },

        testThrottlePut: function() {
            var deferred = this.async(5000);

            var throttle = 500;

            var innerStore = new Memory({
                    idProperty: 'ref',
                    data: [
                        {ref: 'TN', name: 'Tennessee'},
                        {ref: 'VA', name: 'Virginia'},
                        {ref: 'WA', name: 'Washington'},
                        {ref: 'FL', name: 'Florida'},
                        {ref: 'CA', name: 'California'}
                    ]
                }),
                store = new Throttle(innerStore, throttle);

            var request1 = store.put({ref: 'TN', name: 'Test1'}),
                request2 = store.put({ref: 'VA', name: 'Test2'}),
                time1,
                time2;

            request1.then(function(){
                time1 = new Date;
                assert.equal('Test1', innerStore.get('TN').name);
            });
            request2.then(function(){
                time2 = new Date;
                assert.equal('Test2', innerStore.get('VA').name);
            });

            (new DeferredList([request1, request2])).then(deferred.callback(function(){
                assert.operator(throttle, '<', (time2.getTime() - time1.getTime()) * 1.05);
            }));
        }
    });
});
