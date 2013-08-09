define([
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-class',
    'dojo/dom-construct',
    './_WidgetBase',
    './_StoreMixin',
    './_ListMixin',
    'dojo/text!./template/Button.html',
    '../less!../vendor/bootstrap/less/buttons.less',
    '../less!../vendor/bootstrap/less/button-groups.less'
],
function (
    declare,
    string,
    domClass,
    domConstruct,
    WidgetBase,
    StoreMixin,
    ListMixin,
    buttonTemplate
){
    // module:
    //    	havok/widget/ButtonGroup

    return declare(
        [WidgetBase, StoreMixin, ListMixin],
        {

            defaultClass: 'btn-group',

            _domToStoreData: function(){
                var j = 0,
                    node,
                    storeData = [],
                    item,
                    active = [];

                while (this.containerNode.children.length > 0){
                    node = this.containerNode.children[0];
                    if (node.nodeName == 'BUTTON') {
                        domClass.add(node, 'btn');
                    }
                    this.nodes[j] = this.containerNode.removeChild(node);
                    item = {id: j};
                    this._attachClickListener(this.nodes[j], item);
                    storeData.push(item);
                    if (domClass.contains(node, 'active')){
                        active.push(j);
                    }
                    j++;
                }
                if (active.length == 1){
                    this.set('active', active[0]);
                } else if (active.length > 1){
                    this.set('active', active);
                }

                return {data: storeData};
            },

            _createNode: function(item){
                item['!text'] = item.text;
                domConstruct.place(string.substitute(buttonTemplate, item), this.containerNode, 'last');
                return this.containerNode.lastElementChild;
            }
        }
    );
});
