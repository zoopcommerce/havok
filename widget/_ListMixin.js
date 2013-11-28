define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/a11yclick'
],
function (
    declare,
    lang,
    on,
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
                var rendered = this._rendered;
                this.inherited(arguments);
                if (!rendered) this._renderNodes();
            },

            startup: function(){
                this.inherited(arguments);
                this._startupNodes();
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

                if (typeof item == 'string' || item.parentNode != refNode){
                    item = domConstruct.place(item, refNode);
                }

                if (item.tagName == 'HR'){
                    return domConstruct.place(this.dividerTemplate, item, 'replace');
                } else if (!(['LI', 'DROPDOWN-SUBMENU'].indexOf(item.tagName) != -1 || this.itemTemplate == '')) {
                    var outerItem = domConstruct.place(this.itemTemplate, item, 'after');
                    domConstruct.place(item, outerItem);
                    item.setAttribute('data-havok-click-target', true);
                    if (domClass.contains(item, 'active')){
                        domClass.remove(item, 'active');
                        domClass.add(outerItem, 'active');
                    }
                    if (domClass.contains(item, 'disabled')){
                        domClass.remove(item, 'disabled');
                        domClass.add(outerItem, 'disabled');
                    }
                    item = outerItem;
                }

                this._attachClickListener(item);
                return item;
            },

            _renderNodes: function(){
                // summary:
                //      Render all the children of `containerNode` as list items

                for (var i = 0; i < this.containerNode.children.length; i++){
                    this.addItem(this.containerNode.children[i]);
                }
            },

            _startupNodes: function(){
                // summary:
                //      Attatch click listeners to all the children of `containerNode`

                var i,
                    node;

                for (i = 0; i < this.containerNode.children.length; i++){
                    node = this.containerNode.children[i];
                    this._attachClickListener(this.containerNode.children[i]);
                    if (domClass.contains(node, 'active')){
                        this.set('active', node);
                    }
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

            _attachClickListener: function(/*DomNode*/node){
                // node:
                //     The domNode to return when the listener is fired

                if (!this._started) return;

                var target;
                if (!(target = node.querySelector('[data-havok-click-target]'))) target = node;

                on(target, a11yclick.click, lang.hitch(this, function(e){
                    this.onClick(e, node);
                }));
            },

            onClick: function(/*Event*/e, /*DomNode*/node){
                if (domClass.contains(e.target, 'disabled') || domClass.contains(node, 'disabled')){
                    e.preventDefault();
                    return;
                }
                if (e.target.tagName == 'A' && e.target.getAttribute('href')){
                    return;
                }
                e.preventDefault();
                this.set('active', node);
                this.emit('item-click', node);
            }
        }
    );

    /*=====
    ListMixin.__AddOptions = __AddOptions;
    =====*/

    return ListMixin;
});
