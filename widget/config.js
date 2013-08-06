define(
    [],
    function(){
        return {
            di: {
                'havok/store/manager': {
                    proxies: {
                        stores: [
                            {
                                base: 'havok/widget/font',
                                params: {name: 'font'},
                                proxyMethods: [
                                    'get',
                                    'query'
                                ]
                            },
                            {
                                base: 'havok/widget/fontsize',
                                params: {name: 'fontsize'},
                                proxyMethods: [
                                    'get',
                                    'query'
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
);
