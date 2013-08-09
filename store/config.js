define([],
function(){
    return {
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


