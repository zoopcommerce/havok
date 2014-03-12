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
                'f-checkbox'              : '../form/Checkbox',
                'f-checkbox-button-group' : '../form/CheckboxButtonGroup',
                'f-color-picker'          : '../form/ColorPicker',
                'f-credit-card-expiry'    : '../form/CreditCardExpiry',
                'f-currency'              : '../form/Currency',
                'f-date'                  : '../form/Date',
                'f-email'                 : '../form/Email',
                'f-form'                  : '../form/Form',
                'f-hex-color'             : '../form/HexColor',
                'f-number'                : '../form/Number',
                'f-password'              : '../form/Password',
                'f-radio-button-group'    : '../form/RadioButtonGroup',
                'f-select'                : '../form/Select',
                'f-textarea'              : '../form/Textarea',
                'f-textbox'               : '../form/TextBox',
                'f-text-editor'           : '../form/TextEditor',
                'f-toggle-button'         : '../form/ToggleButton',
                'f-typeahead'             : '../form/Typeahead',
                'f-validation-group'      : '../form/ValidationGroup',

                'w-accordion'             : '../widget/Accordion',
                'w-affix'                 : '../widget/Affix',
                'w-alert'                 : '../widget/Alert',
                'w-button'                : '../widget/Button',
                'w-button-group'          : '../widget/ButtonGroup',
                'w-color-dropdown'        : '../widget/ColorDropdown',
                'w-date-dropdown'         : '../widget/DateDropdown',
                'w-dragable'              : '../widget/Dragable',
                'w-dropdown'              : '../widget/Dropdown',
                'w-dropdown-container'    : '../widget/DropdownContainer',
                'w-dropdown-submenu'      : '../widget/DropdownSubmenu',
                'w-dropdown-toggle'       : '../widget/DropdownToggle',
                'w-carousel'              : '../widget/Carousel',
                'w-checkbox-button-group' : '../widget/CheckboxButtonGroup',
                'w-modal'                 : '../widget/Modal',
                'w-movable'               : '../widget/Movable',
                'w-nav-bar'               : '../widget/NavBar',
                'w-nav-bar-links'         : '../widget/NavBarLinks',
                'w-nav-list'              : '../widget/NavList',
                'w-nav-pill'              : '../widget/NavPill',
                'w-nav-tab'               : '../widget/NavTab',
                'w-overlay'               : '../widget/Overlay',
                'w-radio-button-group'    : '../widget/RadioButtonGroup',
                'w-tab-container'         : '../widget/TabContainer',
                'w-text-editor'           : '../widget/TextEditor',
                'w-text-toolbar'          : '../widget/TextToolbar',
                'w-tree'                  : '../widget/Tree',
                'w-toggle-button'         : '../widget/ToggleButton',
                'w-tooltip'               : '../widget/Tooltip'
            },
            mixins: {
                'affix'      : '../widget/_AffixMixin',
                'expand'     : '../form/_ExpandingTextAreaMixin',
                'hotkey'     : '../widget/_HotkeyMixin',
                'required'   : '../form/_ValidationMixin',
                'scroll-spy' : '../widget/_ScrollSpyMixin',
                'sortable'   : '../widget/_SortableMixin',
                'store'      : '../widget/_StoreMixin',
                'validator'  : '../form/_ValidationMixin'
            }
        }
    }
});


