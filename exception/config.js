define(
    [],
    function(){
        return {
            di: {
                'havok/exception/Handler': {
                    gets: {
                        renderers: [
                            'havok/exception/renderer/console'
                        ]
                    },
                    proxyMethods: ['set', 'handle']
                }
            }
        }
    }
);


