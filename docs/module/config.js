define([],
function(){
    return {
        di: {
            'havok/store/stores': {
                proxies: {
                    demostates: [
                        {
                            base: 'havok/docs/module/state',
                            proxyMethods: [
                                'get',
                                'query'
                            ]
                        }
                    ]
                }
            },
            'havok/router/router': {
                params: {
                    routes: [
                        {
                            regex: '[a-zA-Z][a-zA-Z0-9/_-]+.[html|php]',
                            controller: 'havok/docs/module/Controller',
                            defaultMethod: {
                                enter: 'go',
                                exit: 'exit'
                            }
                        }
                    ]
                }
            }
        },
        less: {
            "havok/docs/src/less/variables.less": {defs: true},
            "havok/vendor/bootstrap/less/labels-badges.less": {rank: 1},
            "havok/vendor/bootstrap/less/wells.less": {rank: 1},
            "havok/docs/src/less/docs.less": {rank: 4}
        }
    }
});
