define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    '../string',
    'dojo/dom-style',
    './DropdownToggle'
],
function (
    declare,
    lang,
    array,
    on,
    string,
    domStyle,
    DropdownToggle
){
    // module:
    //    	havok/widget/DropdownSubmenu

    return declare(
        [DropdownToggle],
        {
            // summary:
            //      Displays a submenu inside a parent dropdown

            //baseClass: String
            baseClass: 'dropdown-submenu',

            // togglePlacement: String
            //      This property defines which corner of the toggle the dropdown will be aligned to
            //      Possible values are top-left | top-right | bottom-left | bottom-right
            //      Default value is `top-right`
            togglePlacement: 'top-right',

            // dropdownPlacement: String
            //      This property defined which corner of the dropdown that the toggle will be aligned to
            //      Possible values are top-left | top-right | bottom-left | bottom-right
            //      Default value is `top-left`
            dropdownPlacement: 'top-left',

            //tag: String
            tag: 'li',

            startup: function(){
                this.inherited(arguments);
                on(this.button, 'mouseenter', lang.hitch(this, 'onMouseenter'));
            },

            onMouseenter: function(){
                this.show();
            },

            position: function() {
                this.inherited(arguments);

                domStyle.set(
                    this.dropdown.domNode,
                    'border' +
                    array.map(this._activeDropdownPlacement.split('-'), function(item){return string.ucFirst(item)}).join('') +
                    'Radius',
                    '0px'
                );
            }
        }
    );
});
