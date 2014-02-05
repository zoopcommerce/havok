define([
    'dojo/dom',
    'dojo/when',
    './Datalist',
    '../di/sharedDi!'
],
function(
    dom,
    when,
    Datalist,
    sharedDi
){
    // module:
    //		havok/store/get

    return {
		// summary:
		//		An AMD plugin that returns a store.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            var config = sharedDi.getIdentifierConfig('stores');
            if (!config){
                sharedDi.setIdentifierConfig('stores', {base: {}})
            } else if (!config.base){
                config.base = {};
            }

            when(sharedDi.get('stores'), function(stores){
                if (stores[id]){
                    if (!stores[id].idProperty) stores[id].idProperty = 'id'
                } else {
                    var node;
                    if ((node = dom.byId(id)) && node.nodeName == 'DATALIST'){
                        stores[id] = new Datalist(null, node);
                    }
                }
                callback(stores[id]);
            })
        }
    };
});
