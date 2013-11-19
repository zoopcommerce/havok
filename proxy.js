define([
    'dojo/when',
    './di/sharedDi!'
],
function(
    when,
    sharedDi
){
    // module:
    //		havok/proxy

    return {
		// summary:
		//		An AMD plugin that returns a havok/di/Proxy to the requested object from the shared di container.
        // description:
        //      For example `havok/proxy!myObject`

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            when(sharedDi.proxy(id), function(object){
                callback(object);
            });
        }
    };
});
