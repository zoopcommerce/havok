define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    '../store/manager'
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

            /*=====
            // _gettingStore: Deferred
            _gettingStore: undefined,
            =====*/

            _storeGetter: function(){
                var store = this.store;
                if (store && typeof store == 'string'){
                    //get store from storeManager
                    store = storeManager.get(store);
                    if (store.then){
                        this._gettingStore = new Deferred;
                        store.then(lang.hitch(this, function(value){
                            this.store = value;
                            this._gettingStore.resolve(value);
                        }));
                        return this._gettingStore;
                    }
                    this.store = store;
                }
                return store;
            },

            _querySetter: function(value){
                this.query = this._decodeQuery(value);
            },

            _decodeQuery: function(value){
                var result = {};
                for (var i in value){
                    if (typeof value[i] == 'object' && value[i]['$regex']) {
                        result[i] = new RegExp(value[i]['$regex'])
                    } else {
                        result[i] = value[i]
                    }
                }
                return result;
            },

            _queryResultGetter: function(){
                var done = new Deferred;
                when(this.get('store'), lang.hitch(this, function(store){
                    done.resolve(store.query(this.get('query'), this.get('queryOptions')))
                }))
                return done;
            }
        }
    );
});
