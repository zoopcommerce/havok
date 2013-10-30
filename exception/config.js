define(
    [],
    function(){
        return {
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
    }
);


