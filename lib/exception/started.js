define([
    '../get!./handler'
],
function(
    handler
){
	// module:
	//		havok/router/started

    var startedHandler;

    return {
		// summary:
        //     An AMD plugin that return an instance of havok/exception/Handler that has been
        //     configured by the shared di, and has had startup() called
		//		An AMD plugin that returns the started router.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if ( ! startedHandler){
                startedHandler = handler;
                startedHandler.startup();
            }
            callback(startedHandler);
        }
    };
});
