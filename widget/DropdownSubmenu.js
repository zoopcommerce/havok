define([
    'dojo/_base/declare',
    'dojo/_base/array',
    '../string',
    'dojo/dom-style',
    './DropdownToggle',
    'dojo/text!./template/DropdownBase.html'
],
function (
    declare,
    array,
    string,
    domStyle,
    DropdownToggle,
    template
){
    // module:
    //    	havok/widget/DropdownSubmenu

    return declare(
        [DropdownToggle],
        {

            defaultClass: 'dropdown-submenu',

            templateString: template,

            placement: {
                placementNode: 'top-right',
                dropdown: 'top-left'
            },

            onMouseenter: function(e){
                this.show();
            },

            position: function() {
                this.inherited(arguments);

                domStyle.set(
                    this.dropdown.domNode,
                    'border' +
                    array.map(this._activePlacement.dropdown.split('-'), function(item){return string.ucFirst(item)}).join('') +
                    'Radius',
                    '0px'
                );
            }
        }
    );
});
