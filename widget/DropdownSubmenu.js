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
            baseClass: 'dropdown-submenu',

            togglePlacement: 'top-right',

            dropdownPlacement: 'top-left',

            buildRendering: function(){

                if (this.srcNodeRef && this.srcNodeRef.parentElement.nodeName == 'DROPDOWN'){
                    this.tag = 'li';
                }
                this.inherited(arguments);
            },

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
