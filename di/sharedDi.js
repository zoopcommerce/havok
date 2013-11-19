define([
    './Di',
    '../config/ready!'
],
function(
    Di
){
    // module:
    //		havok/parser/complete

    var sharedDi = undefined;

    return {
		// summary:
		//		An AMD plugin that returns a Di container configured by dojo config.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if ( ! sharedDi){
                sharedDi = new Di();
            }
            callback(sharedDi);
        }
    };
});
