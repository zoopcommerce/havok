define([
    '../get!./Handler'
],
function(
    handler
){
    //
    // An AMD plugin that return an instance of havok/exception/Handler that has been
    // configured by the shared di, and has had startup() called

    var startedHandler = undefined;

    return {
        load: function(id, require, callback){
            if ( ! startedHandler){
                startedHandler = handler;
                startedHandler.startup();
            }
            callback(startedHandler);
        }
    };
});
