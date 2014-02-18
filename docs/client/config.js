define([],
function(){
    return {
        parser: {
            tags: {
                'd-formspy'      : 'docs/Formspy',
                'd-feedback'     : 'docs/Feedback',
                'd-theme-switch' : 'docs/ThemeSwitch'
            }
        },
        di: {
            'havok/store/stores': {
                proxies: {
                    demostates: {
                        base: 'docs/state',
                        proxyMethods: [
                            'get',
                            'query'
                        ]
                    },
                    apiTree: {
                        base: 'docs/apiTree',
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
                            controller: 'docs/Controller',
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
            "docs/vendor/prettify/prettify.css": {rank: 1},
            "bootstrap/less/labels-badges.less": {rank: 1},
            "bootstrap/less/wells.less": {rank: 1},
            "docs/less/docs.less": {rank: 4}
        }
    }
});
