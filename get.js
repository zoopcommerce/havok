define([
        'dojo/when',
        './di/sharedDi!'
    ],
    function(
        when,
        sharedDi
    ){

        // An AMD plugin that returns an instance of the requested object from the
        // shared di

        return {
            load: function(id, require, callback){
                when(sharedDi.get(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


