define(
    [],
    function(){
        return {
            parser: {
                tags: {
                    'dropdown'           : 'havok/widget/Dropdown',
                    'dropdown-container' : 'havok/widget/DropdownContainer',
                    'carousel'           : 'havok/widget/Carousel',
                    'nav-bar'            : 'havok/widget/NavBar',
                    'nav-bar-links'      : 'havok/widget/NavBarLinks',
                    'nav-list'           : 'havok/widget/NavList',
                    'nav-pill'           : 'havok/widget/NavPill',
                    'nav-tab'            : 'havok/widget/NavTab',
                    'overlay'            : 'havok/widget/Overlay'
                },
                mixins: {
                    'affix'     : 'havok/widget/_AffixMixin',
                    'scrollspy' : 'havok/widget/_ScrollSpyMixin',
                    'store'     : 'havok/widget/_StoreMixin'
                }
            },
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
