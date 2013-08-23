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

            //nodes: undefined,

            buildRendering: function(){

                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create('div', {innerHTML: this.innerHTML});
                }
                this.inherited(arguments);

                this.nodes = {};
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
                    text,
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
                                text = aNode[0].innerHTML;
                            } else {
                                href = '';
                                text = '';
                            }

                            if (href && href != ''){
                                id = href;
                            } else {
                                id = j;
                            }

                            item = {id: id, href: href, text: text};
                            this.nodes[id] = node;
                            this._attachClickListener(node, item);
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

            _attachClickListener: function(node, item){

                on(node, a11yclick.click, lang.hitch(this, function(e){
                    if (domClass.contains(e.target, 'disabled') || domClass.contains(e.target.parentNode, 'disabled')){
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

                var i,
                    id;

                for (i = 0; i < data.length; i++){
                    id = data[i][this.store.idProperty];
                    if (this.nodes[id]){
                        domConstruct.place(this.nodes[id], this.containerNode, 'last');
                    } else {
                        this.nodes[id] = this._createNode(data[i]);
                        this._attachClickListener(this.nodes[id], data[i]);
                    }
                }

                //remove old nodes
                var removed = true;
                while (removed){
                    removed = false;
                    if (this.containerNode.children.length > 0 &&
                        ((data.length > 0 && this.containerNode.firstElementChild !== this.nodes[data[0][this.store.idProperty]]) || data.length == 0)
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
