define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/when',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/a11yclick'
],
function (
    declare,
    lang,
    Deferred,
    on,
    when,
    query,
    domAttr,
    domClass,
    domConstruct,
    a11yclick
){
    // module:
    //    	havok/widget/_ListMixin

    return declare(
        [],
        {

            //active: undefined,

            buildRendering: function(){

                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create('div', {innerHTML: this.innerHTML});
                }
                this.inherited(arguments);
            },

            startup: function(){
                this.inherited(arguments);
                if (!this.store){
                    var storeData = this._domToStoreData();
                    if (storeData.data.length > 0){
                        this.set('store', storeData);
                    }
                }
                this.refresh();
            },

            _domToStoreData: function(){
                var i,
                    j = 0,
                    href,
                    id,
                    node,
                    aNode,
                    storeData = [],
                    item;

                for (i = 0; i < this.containerNode.childNodes.length; i++){
                    node = this.containerNode.childNodes[i];
                    if (node.nodeType == 1) {
                        if (node.nodeName == 'HR'){
                            item = {id: j, type: 'divider'};
                        } else {
                            aNode = query('[href]', node);
                            if (aNode.length > 0){
                                href = domAttr.get(aNode[0], 'href');
                            } else {
                                href = '';
                            }

                            if (href && href != ''){
                                id = href;
                            } else {
                                id = j;
                            }
                            item = {id: id, node: node};
                            this._attachClickListener(item);
                        }
                        storeData.push(item);
                        if (domClass.contains(node, 'active')){
                            this.set('active', j);
                        }
                        j++;
                    }
                }
                return {data: storeData};
            },

            _attachClickListener: function(item){
                on(item.node, a11yclick.click, lang.hitch(this, function(e){
                    if (domClass.contains(item.node, 'disabled')){
                        e.preventDefault();
                        return;
                    }
                    if (e.target.nodeName == 'A' && domAttr.has(e.target, 'href') && domAttr.get(e.target, 'href') != ''){
                        return;
                    }
                    e.preventDefault();
                    this.set('active', item);
                    this.emit('item-click', item);
                }));
            },

            refresh: function(){
                if (!this._started){
                    return;
                }

                var result = new Deferred;
                when(this.get('data'), lang.hitch(this, function(data){
                    this._refresh(data);
                    result.resolve();
                }));

                return result;
            },

            _refresh: function(data){

                if (!data){
                    return;
                }

                for (var i = 0; i < data.length; i++){
                    if (data[i].node){
                        domConstruct.place(data[i].node, this.containerNode, 'last');
                    } else {
                        this._createNode(data[i]);
                        this._attachClickListener(data[i]);
                    }
                }

                //remove old nodes
                var removed = true;
                while (removed){
                    removed = false;
                    if (this.containerNode.children.length > 0 &&
                        ((data.length > 0 && this.containerNode.firstElementChild !== data[0].node) || data.length == 0)
                    ){
                        this.containerNode.removeChild(this.containerNode.firstElementChild);
                        removed = true;
                    }
                }

                this.set('active', this.active);
            }
        }
    );
});
