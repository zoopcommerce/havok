define([],
function(){
    return {
        di: {
            'havok/router/router': {
                gets: {
                    di: 'havok/di/sharedDi!'
                },
                params: {
                    routes: [
                        {
                            regex: '[a-zA-Z][a-zA-Z0-9/_-]+', //the catch all route
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
