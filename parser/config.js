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
                'f-checkbox'           : '../form/Checkbox',
                'f-credit-card-expiry' : '../form/CreditCardExpiry',
                'f-currency-textbox'   : '../form/CurrencyTextBox',
                'f-date-textbox'       : '../form/DateTextBox',
                'f-email-textbox'      : '../form/EmailTextBox',
                'f-form'               : '../form/Form',
                'f-checkbox-group'     : '../form/CheckboxGroup',
                'f-number-textbox'     : '../form/NumberTextBox',
                'f-password-textbox'   : '../form/PasswordTextBox',
                'f-radio-group'        : '../form/RadioGroup',
                'f-select'             : '../form/Select',
                'f-textarea'           : '../form/Textarea',
                'f-textbox'            : '../form/TextBox',
                'f-toggle-button'      : '../form/ToggleButton',
                'f-typeahead'          : '../form/Typeahead',
                'f-validation-group'   : '../form/ValidationGroup',
                'f-validation-textarea': '../form/ValidationTextarea',
                'f-validation-textbox' : '../form/ValidationTextBox',

                'w-accordion'          : '../widget/Accordion',
                'w-affix'              : '../widget/Affix',
                'w-alert'              : '../widget/Alert',
                'w-button-group'       : '../widget/ButtonGroup',
                'w-color-dropdown'     : '../widget/ColorDropdown',
                'w-date-dropdown'      : '../widget/DateDropdown',
                'w-dragable'           : '../widget/Dragable',
                'w-dropdown'           : '../widget/Dropdown',
                'w-dropdown-container' : '../widget/DropdownContainer',
                'w-dropdown-submenu'   : '../widget/DropdownSubmenu',
                'w-dropdown-toggle'    : '../widget/DropdownToggle',
                'w-carousel'           : '../widget/Carousel',
                'w-checkbox-group'     : '../widget/CheckboxGroup',
                'w-hotkey-button'      : '../widget/HotkeyButton',
                'w-modal'              : '../widget/Modal',
                'w-movable'            : '../widget/Movable',
                'w-nav-bar'            : '../widget/NavBar',
                'w-nav-bar-links'      : '../widget/NavBarLinks',
                'w-nav-list'           : '../widget/NavList',
                'w-nav-pill'           : '../widget/NavPill',
                'w-nav-tab'            : '../widget/NavTab',
                'w-overlay'            : '../widget/Overlay',
                'w-radio-group'        : '../widget/RadioGroup',
                'w-tab-container'      : '../widget/TabContainer',
                'w-tree'               : '../widget/Tree',
                'w-toggle-button'      : '../widget/ToggleButton',
                'w-tooltip'            : '../widget/Tooltip'
            },
            mixins: {
                'expand'    : 'dijit/form/_ExpandingTextAreaMixin',

                'affix'     : '../widget/_AffixMixin',
                'hotkey'    : '../widget/_HotkeyMixin',
                'scrollspy' : '../widget/_ScrollSpyMixin',
                'sortable'  : '../widget/_SortableMixin',
                'store'     : '../widget/_StoreMixin'
            }
        }
    }
});


