define([],
function(){
	// module:
	//		havok/exception/config

    return {
		// summary:
		//		Default exception handler config
        // description:
        //      This module can be used by [havok/config/manager](../config/manager.html) to provide default exceptin handler configuration.

        bootstrap: [
            'havok/exception/started!'
        ],
        di: {
            'havok/exception/Handler': {
                gets: {
                    renderers: [
                        'havok/exception/renderer/Console'
                    ]
                },
                proxyMethods: ['set', 'handle']
            }
        }
    }
});


