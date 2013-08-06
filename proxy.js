define([
        'dojo/when',
        './di/sharedDi!'
    ],
    function(
        when,
        sharedDi
    ){
        // module:
        //		havok/di/proxy
        //
        // An AMD plugin that return a Proxy to the requested object from the
        // shared di

        return {
            load: function(id, require, callback){
                when(sharedDi.proxy(id), function(object){
                    callback(object);
                });
            }
        };
    }
);
