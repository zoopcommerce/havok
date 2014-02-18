define([
    'dojo/dom',
    'dojo/when',
    'dojo/Deferred',
    './Datalist',
    '../di/sharedDi!'
],
function(
    dom,
    when,
    Deferred,
    Datalist,
    sharedDi
){
    // module:
    //		havok/store/manager

    return {
		// summary:
		//		An AMD plugin that returns a store.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            this.result.get(id).then(function(store){
                callback(store)
            })
        },

        add: function(id, store){
            var done = new Deferred;

            this._getStores().then(function(stores){
                stores[id] = store;
                done.resolve();
            });

            return done;
        },

        get: function(id){
            var done = new Deferred;

            this._getStores().then(function(stores){
                if (stores[id]){
                    if (!stores[id].idProperty) stores[id].idProperty = 'id'
                } else {
                    var node;
                    if ((node = dom.byId(id)) && node.nodeName == 'DATALIST'){
                        stores[id] = new Datalist(null, node);
                    }
                }
                done.resolve(stores[id]);
            });

            return done;
        },

        _getStores: function(){
            var done = new Deferred,
                config = sharedDi.getIdentifierConfig('stores');

            if (!config){
                sharedDi.setIdentifierConfig('stores', {base: {}})
            } else if (!config.base){
                config.base = {};
            }

            when(sharedDi.get('stores'), function(stores){
                done.resolve(stores);
            });

            return done;
        }
    };
});
