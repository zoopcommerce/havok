define(
    [],
    function(){
        return {
            di: {
                'havok/store/stores': {
                    proxies: {
                        font: {
                            base: 'havok/widget/font',
                            proxyMethods: [
                                'get',
                                'query'
                            ]
                        },
                        fontsize: {
                            base: 'havok/widget/fontsize',
                            proxyMethods: [
                                'get',
                                'query'
                            ]
                        }
                    }
                }
            }
        }
    }
);
