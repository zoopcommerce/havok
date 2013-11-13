define([
    'dojo/dom',
    './Datalist'
], function(dom, Datalist){

    // module:
    //		havok/store/manager

    return {
        // summary:
        //      Holds references to lots of different data stores
        // description:
        //      Allows data stores to be centrally managed and injected
        //      whereever they are needed.


        stores: {},

        get: function(/*String*/ref){
            // summary:
            //      Will return an object based on the ref given
            // description:
            //      Will first fetch the store defined in the ref, then the object pointed to by the id in the ref from that store.
            // ref:
            //      Ref should be of the form `storeId/objectId`
            // returns: Object

            var index = ref.lastIndexOf('/'),
                id = ref.substring(index + 1),
                storeId = ref.substring(0, index);

            return this.getStore(storeId).get(id);
        },

        getStore: function(/*String*/id){
            // summary:
            //      Function will return a store based on the store id.
            // id:
            //      Must be a member of `this.stores`
            // returns: dojo/store/api/store

            if (this.stores[id]){
                if (!this.stores[id].idProperty){
                    this.stores[id].idProperty = 'id';
                }
                return this.stores[id];
            } else {
                var node;
                if (!this.stores[id] && (node = dom.byId(id)) && node.nodeName == 'DATALIST'){
                    this.stores[id] = new Datalist(null, node);
                    return this.stores[id];
                }
            }
        }
    }
});
