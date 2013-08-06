define([
    '../get!./router'
],
function(
    router
){
    // module:
    //		havok/router/started
    //
    // An AMD plugin that return an instance of havok/router/router that has been
    // configured by the shared service manager, and has had startup() called

    var startedRouter = undefined;
    return {
        load: function(id, require, callback){
            if ( ! startedRouter){
                startedRouter = router;
                startedRouter.startup();
            }
            callback(startedRouter);
        }
    };
});
