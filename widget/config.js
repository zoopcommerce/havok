define(
    [],
    function(){
        return {
            parser: {
                tags: {
                    'button-group'       : 'havok/widget/ButtonGroup',
                    'date-dropdown'      : 'havok/widget/DateDropdown',
                    'dropdown'           : 'havok/widget/Dropdown',
                    'dropdown-container' : 'havok/widget/DropdownContainer',
                    'dropdown-submenu'   : 'havok/widget/DropdownSubmenu',
                    'dropdown-toggle'    : 'havok/widget/DropdownToggle',
                    'carousel'           : 'havok/widget/Carousel',
                    'checkbox-group'     : 'havok/widget/CheckboxGroup',
                    'hotkey-button'      : 'havok/widget/HotkeyButton',
                    'nav-bar'            : 'havok/widget/NavBar',
                    'nav-bar-links'      : 'havok/widget/NavBarLinks',
                    'nav-list'           : 'havok/widget/NavList',
                    'nav-pill'           : 'havok/widget/NavPill',
                    'nav-tab'            : 'havok/widget/NavTab',
                    'overlay'            : 'havok/widget/Overlay',
                    'radio-group'        : 'havok/widget/RadioGroup',
                    'tab-container'      : 'havok/widget/TabContainer',
                    'tree'               : 'havok/widget/Tree',
                    'toggle-button'      : 'havok/widget/ToggleButton'
                },
                mixins: {
                    'affix'     : 'havok/widget/_AffixMixin',
                    'hotkey'    : 'havok/widget/_HotkeyMixin',
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
