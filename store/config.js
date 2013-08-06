define([],
function(){
    return {
        di: {
            'havok/store/manager': {
                proxyMethods: [
                    'get',
                    'getStore'
                ]
            }
        }
    }
});


