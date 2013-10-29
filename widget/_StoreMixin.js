define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/string',
    'dojo/query',
    '../proxy!../store/manager'
],
function (
    declare,
    lang,
    Deferred,
    when,
    string,
    query,
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

            //_rendered: undefined,

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

            _setActiveAttr: function(value){
                if (!this._rendered) {
                    return;
                }

                if (typeof value == 'string'){
                    value = query('[store-id=' + value + ']', this.containerNode)[0].parentNode;
                }
                this.inherited(arguments, [value]);
            },

            _renderNodes: function(){
                when(this.get('data'), lang.hitch(this, function(data){
                    var i,
                        item,
                        vars,
                        linkTemplate = '<a ${attr} store-id="${storeId}" href="${href}">${text}</a>';

                    for (i = 0; i < data.length; i++){
                        vars = {attr: '', href: '', storeId: data[i][this.store.idProperty]};
                        switch (data[i].type){
                            case 'disabled':
                                vars.attr = 'class="disabled"';
                            case 'link':
                            default:
                                lang.mixin(vars, data[i]);
                                item = string.substitute(linkTemplate, vars);
                        }
                        this.addItem(item);
                    }
                    this._rendered = true;
                    this.set('active', this.active);
                }));
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
