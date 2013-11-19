define([],
function(){
    // module:
    //		havok/parser/config

    /*=====
    var __ParserConfig = {
        // tags: Object
        //      A mapping of custom tags to widgets.
        //      Eg: `{'modal' : 'havok/widget/Modal'}`
        //      This mapping may be expanded or overridden.
        //
        // mixins: Object
        //      A mapping of friendly mixin names to modules.
        //      Eg: `{'sortable' : 'havok/widget/_SortableMixin'}`
        //      This mapping may be expanded or overridden.
    };
    =====*/

    return {
        // summary:
        //		Default parser config
        // description:
        //      This module can be used by [havok/config/manager](../config/manager.html) to provide default parser configuration.

        // parser: __ParserConfig
        //      Parser configuration object
        parser: {
            tags: {
                'accordion'          : '../widget/Accordion',
                'alert'              : '../widget/Alert',
                'button-group'       : '../widget/ButtonGroup',
                'date-dropdown'      : '../widget/DateDropdown',
                'dragable'           : '../widget/Dragable',
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
                'sortable'  : '../widget/_SortableMixin',
                'store'     : '../widget/_StoreMixin'
            }
        }
    }
});


