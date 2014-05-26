define([
    './Di',
    '../config/ready!'
],
function(
    Di
){
    // module:
    //		havok/di/sharedDi

    var sharedDi = undefined;

    return {
		// summary:
		//		An AMD plugin that returns a Di container configured by dojo config.

        dynamic: true,

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if ( ! sharedDi){
                sharedDi = new Di();
            }
            callback(sharedDi);
        }
    };
});
