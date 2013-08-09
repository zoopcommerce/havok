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
                name = ref.substring(0, index);

            return this.getStore(name).get(id);
        },

        getStore: function(name){
            // Function will return a store based on the store name.

            if (this.stores[name]){
                if (!this.stores[name].idProperty){
                    this.stores[name].idProperty = 'id';
                }
                return this.stores[name];
            }
        }
    }
});
