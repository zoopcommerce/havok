define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_WidgetBase',
    './_ListMixin',
    '../less!bootstrap/less/buttons.less',
    '../less!bootstrap/less/button-groups.less'
],
function (
    declare,
    domClass,
    WidgetBase,
    ListMixin
){
    // module:
    //    	havok/widget/ButtonGroup

    return declare(
        [WidgetBase, ListMixin],
        {
            // summary:
            //      Creates a group of buttons that can be interacted with as a single widget.

            // tag: String
            tag: 'div',

            // baseClass: String
            baseClass: 'btn-group',

            _setActiveAttr: function(/*DomNode*/value){
                this._set('active', value);
            },

            addButton: function(/*DomNode*/item){
                domClass.add(item, 'btn');
                return item;
            },

            addWButton: function(/*DomNode*/item){
                return this.addButton(item);
            },

            addWToggleButton: function(/*DomNode*/item){
                return this.addButton(item);
            },

            addWDropdownToggle: function(/*DomNode*/item){
                return this.addButton(item);
            }
        }
    );
});
