define(
    [],
    function(){
        return {
            parser: {
                tags: {
                    'accordion'          : '../widget/Accordion',
                    'alert'              : '../widget/Alert',
                    'button-group'       : '../widget/ButtonGroup',
                    'date-dropdown'      : '../widget/DateDropdown',
                    'dropdown'           : '../widget/Dropdown',
                    'dropdown-container' : '../widget/DropdownContainer',
                    'dropdown-submenu'   : '../widget/DropdownSubmenu',
                    'dropdown-toggle'    : '../widget/DropdownToggle',
                    'carousel'           : '../widget/Carousel',
                    'checkbox-group'     : '../widget/CheckboxGroup',
                    'hotkey-button'      : '../widget/HotkeyButton',
                    'modal'              : '../widget/Modal',
                    'nav-bar'            : '../widget/NavBar',
                    'nav-bar-links'      : '../widget/NavBarLinks',
                    'nav-list'           : '../widget/NavList',
                    'nav-pill'           : '../widget/NavPill',
                    'nav-tab'            : '../widget/NavTab',
                    'overlay'            : '../widget/Overlay',
                    'radio-group'        : '../widget/RadioGroup',
                    'tab-container'      : '../widget/TabContainer',
                    'tree'               : '../widget/Tree',
                    'toggle-button'      : '../widget/ToggleButton',
                    'tooltip'            : '../widget/Tooltip'
                },
                mixins: {
                    'affix'     : '../widget/_AffixMixin',
                    'hotkey'    : '../widget/_HotkeyMixin',
                    'scrollspy' : '../widget/_ScrollSpyMixin',
                    'store'     : '../widget/_StoreMixin'
                }
            }
        }
    }
);


