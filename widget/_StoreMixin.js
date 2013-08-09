define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/store/Memory',
    '../proxy!../store/manager'
],
function (
    declare,
    lang,
    Deferred,
    when,
    Memory,
    storeManager
){
    return declare(
        [],
        {
            // store: dojo/store/api/Store

            // query: object
            //		A query to use when fetching items from our store

            // queryOptions: object
            //		Query options to use when fetching from the store

            //_settingStore: undefined,

            // queryThrottle: integer
            // A value in milliseconds
            // The store will not be queried at a rate faster than the set queryThrottle interval.
            // Query results are cached and used to update the typeahead options while
            // queries on the store are throttled
            queryThrottle: 0,

            //_dataCurrentDeferred: undefined,

            //_dataPendingDeferred: undefined,

            _readyToQuery: true,

            //_pendingQuery: undefined,

            _setStoreAttr: function(value){
                this._settingStore = new Deferred;
                if (value && typeof value == 'string'){
                    //get store from storeManager
                    value = storeManager.getStore(value);
                } else if (value && !value.query){
                    value = new Memory(value);
                }
                if (value.then){
                    value.then(lang.hitch(this, function(value){
                        this._set('store', value);
                        this._settingStore.resolve();
                    }));
                    return;
                }
                this._set('store', value);
                this._settingStore.resolve();
            },

            _getStoreAttr: function(){
                if (this._settingStore){
                    var result = new Deferred;
                    this._settingStore.then(lang.hitch(this, function(){
                        result.resolve(this.store);
                    }));
                    return result;
                } else {
                    return this.store;
                }
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
    )
});
