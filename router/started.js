define([
    '../get!./router'
],
function(
    router
){
	// module:
	//		havok/router/started


    var startedRouter;

    return {
		// summary:
		//		An AMD plugin that returns the started router.
        // description:
        //      Instance of `havok/router/router` will be returned that has been configured by the shared di instance,
        //      and has had `router.startup()` called.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if ( ! startedRouter){
                startedRouter = router;
                startedRouter.startup();
            }
            callback(startedRouter);
        }
    };
});
