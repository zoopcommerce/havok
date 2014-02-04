define([
    'dojo/when',
    './manager'
],
function(
    when,
    manager
){
	// module:
	//		havok/config/started

    return {
		// summary:
		//		An AMD plugin that will wait until merged config is complete

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            when(manager.merge(), function(config){
                callback(config);
            });
        }
    };
});
