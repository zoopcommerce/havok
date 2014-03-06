define([
    './started!'
],
function(
    router
){
    // module:
    //		havok/router/baseUrl

    return {
		// summary:
		//		An AMD plugin that returns the baseUrl of the started router.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            callback(router.baseUrl);
        }
    };
});


