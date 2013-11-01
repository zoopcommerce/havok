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

            tag: 'div',

            baseClass: 'btn-group',

            itemTemplate: '',

            addItem: function(item){
                var node = this.inherited(arguments);
                domClass.add(node, 'btn');
                return node;
            }
        }
    );
});
