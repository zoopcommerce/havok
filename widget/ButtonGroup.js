define([
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-class',
    'dojo/dom-construct',
    './_WidgetBase',
    './_StoreMixin',
    './_ListMixin',
    'dojo/text!./template/ButtonGroup.html',
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
    template,
    buttonTemplate
){
    // module:
    //    	havok/widget/ButtonGroup

    var ButtonGroup = declare(
        [WidgetBase, StoreMixin, ListMixin],
        {

            'class': 'btn-group',

            templateString: template,

            buildRendering: function(){

                this.inherited(arguments);

                var i,
                    node;

                for (i = 0; i < this.containerNode.childNodes.length; i++){
                    node = this.containerNode.childNodes[i];
                    if (node.nodeType == 1 && node.nodeName == 'BUTTON') {
                        domClass.add(node, 'btn');
                    }
                }
            },

            _domToStoreData: function(){
                var j = 0,
                    hasHR = false,
                    node,
                    storeData = [],
                    item,
                    buttonGroup,
                    active = [],
                    buttonGroupData;

                while (this.containerNode.children.length > 0){
                    node = this.containerNode.children[0];
                    if (node.nodeName == 'HR'){
                        hasHR = true;
                        buttonGroupData = [];
                        while (storeData.length > 0 && storeData[storeData.length - 1].type == 'button'){
                            buttonGroupData.unshift(storeData.pop());
                        }
                        buttonGroup = new ButtonGroup({store: {data: buttonGroupData}});
                        buttonGroup.startup();
                        item = {id: j, type: 'button-group', node: buttonGroup.domNode};
                        this.containerNode.removeChild(node);
                    } else if (node.nodeName == 'BUTTON') {
                        domClass.add(node, 'btn');
                        item = {id: j, type: 'button', node: this.containerNode.removeChild(node)};
                        this._attachClickListener(item);
                    } else {
                        item = {id: j, type: 'button', node: this.containerNode.removeChild(node)};
                        this._attachClickListener(item);
                    }
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

                if (hasHR){
                    buttonGroupData = [];
                    while (storeData.length > 0 && storeData[storeData.length - 1].type == 'button'){
                        buttonGroupData.unshift(storeData.pop());
                    }
                    buttonGroup = new ButtonGroup({store: {data: buttonGroupData}});
                    buttonGroup.startup();
                    storeData.push({id: j, type: 'button-group', node: buttonGroup.domNode});

                    this.set('class', 'btn-toolbar');
                }
                return {data: storeData};
            },

            _createNode: function(item){
                if (item.type == 'button'){
                    item['!text'] = item.text;
                    domConstruct.place(string.substitute(buttonTemplate, item), this.containerNode, 'last');
                }
                item.node = this.containerNode.lastElementChild;
            }
        }
    );
    return ButtonGroup;
});
