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
            //store: undefined,

            // query: object
            //		A query to use when fetching items from our store

            // queryOptions: object
            //		Query options to use when fetching from the store

            //_gettingStore: undefined,

            // A value in milliseconds
            // The store will not be queried at a rate faster than the set queryThrottle interval.
            // Query results are cached and used to update the typeahead options while
            // queries on the store are throttled
            queryThrottle: 0,

            //_dataCurrentDeferred: undefined,

            //_dataPendingDeferred: undefined,

            _readyToQuery: true,

            //_pendingQuery: undefined,

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
                if (typeof value == 'string'){
                    value = JSON.parse(value);
                    for (var i in value){
                        if (typeof value[i] == 'object' && value[i]['$regex']) value[i] = new RegExp(value[i]['$regex'])
                    }
                }
                this._set('query', value);
            },

            _getQueryAttr: function(){
                return lang.mixin({parent: undefined}, this.query);
            },

            _getDataAttr: function(){

                if (this._readyToQuery){
                    if (this._dataPendingDeferred){
                        this._dataCurrentDeferred = this._dataPendingDeferred;
                        delete(this._dataPendingDeferred);
                    } else {
                        this._dataCurrentDeferred = new Deferred;
                    }

                    this._readyToQuery = false;
                    setTimeout(lang.hitch(this, function(){
                        this._readyToQuery = true;
                        if (this._dataPendingDeferred){
                            this.get('data');
                        }
                    }), this.queryThrottle);
                    when(this.get('store'), lang.hitch(this, function(store){
                        when(store.query(this.get('query'), this.get('queryOptions')), lang.hitch(this, function(data){
                            this._dataCurrentDeferred.resolve(data);
                        }));
                    }))
                    return this._dataCurrentDeferred;
                } else {
                    if (!this._dataPendingDeferred){
                        this._dataPendingDeferred = new Deferred;
                    }
                    return this._dataPendingDeferred;
                }
            }
        }
    );
});
