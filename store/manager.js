define([], function(){
    // module:
    //		havok/store/manager
    // summary:
    //      Holds references to lots of different stores that allows them to be injected
    //      whereever they are needed.
    //

    return {

        stores: [],

        get: function(ref){
            // Will return an object based on the ref given

            var index = ref.lastIndexOf('/'),
                id = ref.substring(index + 1),
                name = ref.substring(0, index);

            return this.getStore(name).get(id);
        },

        getStore: function(name){
            // Function will return a store based on the store name.

            for(var index in this.stores){
                if (this.stores[index].name == name){

                    return this.stores[index];
                }
            }
        }
    }
});
