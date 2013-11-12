define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-construct',
    '../proxy!../store/manager'
],
function (
    require,
    declare,
    lang,
    Deferred,
    when,
    string,
    domAttr,
    domConstruct,
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

            //_nodesRendered: undefined,

            //_storeAdapterMixedin: undefined,

            constructor: function(){

                //auto mixin of a store adapter to handle custom rendering
                if (!this.storeAdapter){
                    this.storeAdapter = './_DropdownStoreAdapterMixin';
                }

                this._storeAdapterMixedin = new Deferred;
                require([this.storeAdapter], lang.hitch(this, function(Adapter){
                    declare.safeMixin(this, new Adapter);
                    this._storeAdapterMixedin.resolve();
                }));
            },

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
                if (!this._nodesRendered) {
                    this.active = value;
                    return;
                }

                if (typeof value == 'string'){
                    var nodes = this.containerNode.querySelectorAll('[data-havok-store-id=' + value + ']');
                    if (nodes.length > 0){
                        value = nodes[0];
                    }
                }
                this.inherited(arguments, [value]);
            },

            _renderNodes: function(){
                when(this.get('data'), lang.hitch(this, function(data){
                    this._storeAdapterMixedin.then(lang.hitch(this, function(){
                        for (var i = 0; i < data.length; i++){
                            this.addItem(data[i], {fromStore: true, storeId: data[i][this.store.idProperty]});
                        }
                        this._nodesRendered = true;
                        if (this.active){
                            this.set('active', this.active);
                        }
                    }))
                }));
            },

            addItem: function(item, options){
                if (!options) options = {};

                if (options.fromStore){
                    //the item object is from a store, and needs to be transformed into a html string/node
                    var node,
                        vars,
                        itemTemplate = '<a ${attr} href="${href}">${label}</a>';

                    vars = {attr: '', href: '', storeId: item[this.store.idProperty]};
                    if (item.disabled){
                        vars.attr = 'class="disabled"';
                    }
                    if (item.type == 'nav-header') {
                        vars.attr = 'class="nav-header"';
                    }
                    if (item.type == 'divider'){
                        node = this.dividerTemplate;
                    } else {
                        lang.mixin(vars, item);
                        node = string.substitute(itemTemplate, vars);
                    }
                    if (item.type == 'group'){
                        node = this._renderGroup(domConstruct.place(node, this.containerNode), item);
                    }
                    item = node;
                }

                item = this.inherited(arguments);
                domAttr.set(item, 'data-havok-store-id', options.storeId);
                return item;
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
