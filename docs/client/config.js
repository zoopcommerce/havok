define([],
function(){
    return {
        parser: {
            tags: {
                'd-formspy'      : 'havok/docs/client/Formspy',
                'd-feedback'     : 'havok/docs/client/Feedback',
                'd-theme-switch' : 'havok/docs/client/ThemeSwitch'
            }
        },
        di: {
            'havok/store/stores': {
                proxies: {
                    demostates: {
                        base: 'havok/docs/client/state',
                        proxyMethods: [
                            'get',
                            'query'
                        ]
                    },
                    apiTree: {
                        base: 'havok/docs/client/apiTree',
                        proxyMethods: [
                            'get',
                            'query'
                        ]
                    }
                }
            },
            'havok/router/router': {
                params: {
                    baseUrlDefault: 'site',
                    routes: [
                        {
                            regex: '^$|api|[a-zA-Z][a-zA-Z0-9/_-]+.html',
                            controller: 'havok/docs/client/Controller',
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
            "havok/docs/client/vendor/prettify/prettify.css": {rank: 1},
            "bootstrap/less/labels-badges.less": {rank: 1},
            "bootstrap/less/wells.less": {rank: 1},
            "havok/docs/client/less/docs.less": {rank: 4}
        }
    }
});
