define([], function(){
    // module:
    //		havok/store/manager
    // summary:
    //      Holds references to lots of different stores that allows them to be injected
    //      whereever they are needed.
    //

    return {

        stores: {},

        get: function(ref){
            // Will return an object based on the ref given

            var index = ref.lastIndexOf('/'),
                id = ref.substring(index + 1),
                storeId = ref.substring(0, index);

            return this.getStore(storeId).get(id);
        },

        getStore: function(id){
            // Function will return a store based on the store id.

            if (this.stores[id]){
                if (!this.stores[id].idProperty){
                    this.stores[id].idProperty = 'id';
                }
                return this.stores[id];
            }
        }
    }
});
