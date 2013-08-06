define([],
function(){
    return {
        di: {
            'havok/store/manager': {
                proxies: {
                    stores: [
                        {
                            base: 'havok/docs/module/state',
                            params: {name: 'demostates'},
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
                            regex: /[a-zA-Z][a-zA-Z0-9/_-]+.[html|php]/,
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
            "havok/vendor/bootstrap/less/labels-badges.less": {block: 1},
            "havok/vendor/bootstrap/less/wells.less": {block: 1},
            "havok/docs/src/less/docs.less": {block: 3}
        }
    }
});
