define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    '../proxy!../store/manager'
],
function (
    declare,
    lang,
    Deferred,
    when,
    storeManager
){

    return declare(
        [],
        {
            /*=====
            // store: String|Object
            store: undefined,
            =====*/

            // query: Object
            //      A query to use when fetching items from our store
            query: {},

            // queryOptions: Object
            //      Query options to use when fetching from the store
            queryOptions: {},

            // queryThrottle: Int
            //      A value in milliseconds
            //      The store will not be queried at a rate faster than the set queryThrottle interval.
            queryThrottle: 50,

            /*=====
            // _gettingStore: Deferred
            _gettingStore: undefined,
            =====*/

            /*=====
            // _dataCurrentDeferred: Deferred
            _dataCurrentDeferred: undefined,
            =====*/

            /*=====
            // _dataPendingDeferred: Deferred
            _dataPendingDeferred: undefined,
            =====*/

            // _readyToQuery: Boolean
            _readyToQuery: true,

            /*=====
            // _pendingQuery: Boolean
            _pendingQuery: undefined,
            =====*/

            _getStoreAttr: function(){
                var store = this.store;
                if (store && typeof store == 'string'){
                    //get store from storeManager
                    store = storeManager.getStore(store);

                    if (store.then){
                        this._gettingStore = new Deferred;
                        store.then(lang.hitch(this, function(value){
                            this._set('store', value);
                            this._gettingStore.resolve(value);
                        }));
                        return this._gettingStore;
                    }
                    this._set('store', store);
                }
                return store;
            },

            _setQueryAttr: function(value){
                for (var i in value){
                    if (typeof value[i] == 'object' && value[i]['$regex']) value[i] = new RegExp(value[i]['$regex'])
                }
                this._set('query', value);
            },

            _getQueryAttr: function(){
                return lang.mixin({parent: undefined}, this.query);
            },

            _getQueryResultAttr: function(){
                if (this._readyToQuery){
                    if (this._queryResultPendingDeferred){
                        this._queryResultCurrentDeferred = this._queryResultPendingDeferred;
                        delete(this._queryResultPendingDeferred);
                    } else {
                        this._queryResultCurrentDeferred = new Deferred;
                    }

                    this._readyToQuery = false;
                    this._dataCurrentDeferred = new Deferred;

                    setTimeout(lang.hitch(this, function(){
                        if (this._dataCurrentDeferred.isResolved()){
                            this._readyToQuery = true;
                            if (this._queryResultPendingDeferred) this.get('queryResult')
                        } else {
                            this._dataCurrentDeferred.then(lang.hitch(this, function(){
                                this._readyToQuery = true;
                                if (this._queryResultPendingDeferred) this.get('queryResult')
                            }))
                        }
                    }), this.queryThrottle);
                    when(this.get('store'), lang.hitch(this, function(store){
                        if (store) {
                            var queryResult = store.query(this.get('query'), this.get('queryOptions'));
                            when(queryResult, lang.hitch(this, function(){
                                this._dataCurrentDeferred.resolve();
                            }));
                            this._queryResultCurrentDeferred.resolve(queryResult);
                        } else {
                            this._dataCurrentDeferred.resolve();
                            this._queryResultCurrentDeferred.resolve();
                        }
                    }))
                    return this._queryResultCurrentDeferred;
                } else {
                    if (!this._queryResultPendingDeferred) this._queryResultPendingDeferred = new Deferred;
                    return this._queryResultPendingDeferred;
                }
            }
        }
    );
});
