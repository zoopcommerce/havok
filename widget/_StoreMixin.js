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

            _getStoreAttr: function(){
                var store = this.store;
                if (store && typeof store == 'string'){
                    //get store from storeManager
                    store = storeManager.get(store);

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
                var done = new Deferred;
                when(this.get('store'), lang.hitch(this, function(store){
                    done.resolve(store.query(this.get('query'), this.get('queryOptions')))
                }))
                return done;
            }
        }
    );
});
