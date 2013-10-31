define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-construct',
    './Dropdown',
    './DropdownSubmenu',
    '../proxy!../store/manager'
],
function (
    declare,
    lang,
    Deferred,
    when,
    string,
    domAttr,
    domConstruct,
    Dropdown,
    DropdownSubmenu,
    storeManager
){
    var StoreMixin = declare(
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
                    return;
                }

                if (typeof value == 'string'){
                    for (var i = 0; i < this.containerNode.children.length; i++){
                        if (domAttr.get(this.containerNode.children[i], 'data-havok-store-id') == value){
                            value = this.containerNode.children[i];
                        }
                    }
                }
                this.inherited(arguments, [value]);
            },

            _renderNodes: function(){
                when(this.get('data'), lang.hitch(this, function(data){
                    var i,
                        item,
                        vars,
                        itemTemplate = '<a ${attr} href="${href}">${text}</a>';

                    for (i = 0; i < data.length; i++){
                        vars = {attr: '', href: '', storeId: data[i][this.store.idProperty]};
                        if (data[i].state == 'disabled'){
                            vars.attr = 'class="disabled"';
                        }
                        if (data[i].type == 'divider'){
                            item = this.dividerTemplate;
                        } else {
                            lang.mixin(vars, data[i]);
                            item = string.substitute(itemTemplate, vars);
                        }
                        if (data[i].type == 'dropdown'){
                            item = domConstruct.place(item, this.containerNode);
                            var dropdown = new (declare([Dropdown, StoreMixin], {}))({store: this.store, query: {parent: 4}}),
                                submenu = new DropdownSubmenu({dropdown: dropdown, button: item, tag: 'li'});
                            this.containerNode.appendChild(submenu.domNode);
                            submenu.containerNode.appendChild(item);
                            submenu.startup();
                            item = submenu.domNode;
                        }
                        this.addItem(item, vars.storeId);
                    }
                    this._nodesRendered = true;
                    if (this.active){
                        this.set('active', this.active);
                    }
                }));
            },

            addItem: function(item, id){
                item = this.inherited(arguments);
                domAttr.set(item, 'data-havok-store-id', id);
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
    return StoreMixin;
});
