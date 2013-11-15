define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_WidgetBase',
    './_ListMixin',
    '../less!../vendor/bootstrap/less/buttons.less',
    '../less!../vendor/bootstrap/less/button-groups.less'
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

            // itemTemplate: String
            itemTemplate: '',

            addItem: function(/*DomNode*/item){
                var node = this.inherited(arguments);
                domClass.add(node, 'btn');
                return node;
            }
        }
    );
});
