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

    /*=====
    var __AddOptions = {
        // refNode: DomNode
        //      The rendered list item will be added as a child of the `refNode`.
        //      Defaults to the widget's containerNode
    };
    =====*/

    var ListMixin = declare(
        [],
        {
            // summary:
            //      Foundational mixin for widgets handling lists

            //active: undefined,

            // tag: String
            tag: 'ul',

            // itemTemplate: String
            itemTemplate: '<li></li>',

            // dividerTemplate: String
            dividerTemplate: '<li class="divider"></li>',

            buildRendering: function(){
                this.inherited(arguments);
                this._renderNodes();
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){
                // summary:
                //     Add an item to the list
                // item:
                //     The domNode that the new list itme will be created from.
                //     If a string is given, it must be the id of a domNode.
                // options:
                //     Modify the behaviour of addItem. Primarily used by widgets that
                //     extend `addItem`.

                if (!options) options = {};

                var refNode = options.refNode;
                if (!refNode){
                    refNode = this.containerNode;
                }

                if (typeof item == 'string' || item.parentElement != refNode){
                    item = domConstruct.place(item, refNode);
                }

                if (item.nodeName == 'HR'){
                    return domConstruct.place(this.dividerTemplate, item, 'replace');
                } else if (['LI', 'DROPDOWN-SUBMENU'].indexOf(item.nodeName) != -1 || this.itemTemplate == ''){
                    this._attachClickListener(item, item);
                    if (domClass.contains(item, 'active')){
                        this.set('active', item);
                    }
                    return item;
                } else {
                    var outerItem = domConstruct.place(this.itemTemplate, item, 'after');
                    domConstruct.place(item, outerItem);
                    this._attachClickListener(item, outerItem);
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
                // summary:
                //      Render all the children of `containerNode` as list items

                for (var i = 0; i < this.containerNode.children.length; i++){
                    this.addItem(this.containerNode.children[i]);
                }
            },

            _setActiveAttr: function(/*DomNode*/value){
                if (this.active && this.active.nodeType){
                    domClass.remove(this.active, 'active');
                }
                if (value && value.nodeType){
                    domClass.add(value, 'active');
                }
                this._set('active', value);
            },

            _attachClickListener: function(/*DomNode*/node, /*DomNode*/item){
                // node:
                //     The domNode to attach the click listener to
                // item:
                //     The domNode to set as active when the click listener is fired
                on(node, a11yclick.click, lang.hitch(this, function(e){
                    this.onClick(e, item);
                }));
            },

            onClick: function(/*Event*/e, /*DomNode*/item){
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
            }
        }
    );

    /*=====
    ListMixin.__AddOptions = __AddOptions;
    =====*/

    return ListMixin;
});
