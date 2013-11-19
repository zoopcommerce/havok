define([
    'dojo/when',
    './di/sharedDi!'
],
function(
    when,
    sharedDi
){
    // module:
    //		havok/get

    return {
		// summary:
		//		An AMD plugin that returns an instance of the requested object from the shared di container.
        // description:
        //      For example `havok/get!myObject`

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            when(sharedDi.get(id), function(object){
                callback(object);
            });
        }
    };
});


