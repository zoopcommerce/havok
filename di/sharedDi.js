define([
        './Di',
        '../config/ready!'
    ],
    function(
        Di
    ){
        //
        // An AMD plugin that returns an instance of the Di configured
        // by dojo config

        var sharedDi = undefined;
        return {
            load: function(id, require, callback){
                if ( ! sharedDi){
                    sharedDi = new Di();
                }
                callback(sharedDi);
            }
        };
    }
);
