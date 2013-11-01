define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/a11yclick'
],
function (
    declare,
    lang,
    on,
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

            tag: 'ul',

            templateString: '<${tag} data-dojo-attach-point="containerNode"></${tag}>',

            itemTemplate: '<li></li>',

            dividerTemplate: '<li class="divider"></li>',

            buildRendering: function(){

                this.inherited(arguments);
                this._renderNodes();
            },

            addItem: function(item){
                if (typeof item == 'string'){
                    item = domConstruct.place(item, this.containerNode);
                }
                if (item.nodeName == 'HR'){
                    return domConstruct.place(this.dividerTemplate, item, 'replace');
                } else if (['LI', 'DROPDOWN-SUBMENU'].indexOf(item.nodeName) != -1 || this.itemTemplate == ''){
                    this._attachClickListener(item);
                    if (domClass.contains(item, 'active')){
                        this.set('active', item);
                    }
                    return item;
                } else {
                    var outerItem = domConstruct.place(this.itemTemplate, item, 'after');
                    domConstruct.place(item, outerItem);
                    this._attachClickListener(item);
                    if (domClass.contains(item, 'active')){
                        domClass.remove(item, 'active');
                        this.set('active', outerItem);
                    }
                    if (domClass.contains(item, 'disabled')){
                        domClass.remove(item, 'disabled');
                        domClass.add(outerItem, 'disabled');
                    }
                    return outerItem;
                }
            },

            _renderNodes: function(){
                for (var i = 0; i < this.containerNode.children.length; i++){
                    this.addItem(this.containerNode.children[i]);
                }
            },

            _setActiveAttr: function(value){
                if (typeof this.active == 'object'){
                    domClass.remove(this.active, 'active');
                }
                domClass.add(value, 'active');
                this._set('active', value);
            },

            _attachClickListener: function(node, item){

                on(node, a11yclick.click, lang.hitch(this, function(e){
                    var item = node;

                    while (item.parentNode != this.containerNode){
                        item = item.parentNode;
                    }

                    if (domClass.contains(e.target, 'disabled') || domClass.contains(item, 'disabled')){
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
            }
        }
    );
});
