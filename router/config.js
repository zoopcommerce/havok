define([],
function(){
	// module:
	//		havok/router/config

    return {
		// summary:
		//		Default router config
        // description:
        //      This module can be used by [havok/config/manager](../config/manager.html) to provide default router configuration.

        bootstrap: [
            'havok/router/started!'
        ],
        di: {
            'havok/router/router': {
                gets: {
                    di: 'havok/di/sharedDi!'
                },
                params: {
                    routes: [
                        {
                            regex: '^$|[a-zA-Z][a-zA-Z0-9/_-]+', //the catch all route
                            ignore: true
                        },
                        {
                            regex: 'back',
                            defaultMethod: -1
                        },
                        {
                            regex: 'forward',
                            defaultMethod: 1
                        }
                    ]
                }
            }
        }
    }
});
