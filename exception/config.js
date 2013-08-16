define(
    [],
    function(){
        return {
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
    }
);


