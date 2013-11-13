define([],
function(){
	// module:
	//		havok/store/config

    return {
		// summary:
		//		Default manager config
        // description:
        //      This module can be used by [havok/config/manager](../config/manager.html) to provide default store manager configuration.

        di: {
            'havok/store/manager': {
                gets: {
                    stores: 'havok/store/stores'
                },
                proxyMethods: [
                    'get',
                    'getStore'
                ]
            },
            'havok/store/stores': {
                base: {}
            }
        }
    }
});


