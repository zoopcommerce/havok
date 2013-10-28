define([],
function(){
    return {
        parser: {
            tags: {
                'memory-store' : 'havok/store/Memory'
            }
        },
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


