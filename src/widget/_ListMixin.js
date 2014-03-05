define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/a11yclick',
    '../string'
],
function (
    require,
    declare,
    lang,
    Deferred,
    on,
    domClass,
    domConstruct,
    a11yclick,
    string
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

            // dividerTemplate: String
            dividerTemplate: '<li class="divider"></li>',

            // _handlerId: Int

            constructor: function(params){
                if (params && params.store){
                    //a store is set, so use the storeAdapterMixin
                    var adapter = './_StoreAdapterMixin';
                    if (this.storeAdapter) adapter = this.storeAdapter;
                    if (params.storeAdapter) adapter = params.storeAdapter;
                    this.mixinAdapter(adapter);
                }
                this._handlerId = 0;
            },

            mixinAdapter: function(adapter){
                this._storeAdapterMixedIn = new Deferred;
                require([adapter], lang.hitch(this, function(Adapter){
                    declare.safeMixin(this, new Adapter);
                    this._storeAdapterMixedIn.resolve();
                }))
            },

            buildRendering: function(){
                this.inherited(arguments);
                this.refresh();
            },

            addHr: function(/*DomNode|String*/item){
                return domConstruct.place(this.dividerTemplate, item, 'replace');
            },

            addLi: function(/*DomNode|String*/item){
                return item;
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){
                // summary:
                //     Add an item to the list
                // item:
                //     The domNode that the new list item will be created from.
                //     If a string is given, it must be a html fragment.
                // options:
                //     Modify the behaviour of addItem. Primarily used by widgets that
                //     extend `addItem`.

                if (!options) options = {};

                var refNode = options.refNode || this.containerNode,
                    func;

                if (typeof item == 'string' || item.parentNode != refNode) item = domConstruct.place(item, refNode)

                func = 'add' + string.ucFirst(string.camelCase(item.tagName));

                if (this[func]){
                    item = this['add' + string.ucFirst(string.camelCase(item.tagName))](item, options);
                } else {
                    var outerItem = domConstruct.place('<li></li>', item, 'after');
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

                if (domClass.contains(item, 'active')) this.set('active', item)
                this._attachClickHandler(item);
                return item;
            },

            removeItem: function(/*DomNode|String*/item){
                this._removeClickHandler(item);
                domConstruct.destroy(item);
            },

            refresh: function(){
                // summary:
                //      Render all the children of `containerNode` as list items

                if (this._storeAdapterMixedIn && !this._storeAdapterMixedIn.isFulfilled()) {
                    this._storeAdapterMixedIn.then(lang.hitch(this, function(){this.refresh()}));
                    return;
                }

                for (var i = 0; i < this.containerNode.children.length; i++){
                    this.addItem(this.containerNode.children[i]);
                }
            },

            _setActiveAttr: function(/*DomNode*/value){
                if (this.active && this.active.nodeType) domClass.remove(this.active, 'active')
                if (value && value.nodeType) domClass.add(value, 'active')

                this._set('active', value);
            },

            _attachClickHandler: function(/*DomNode*/node){
                // node:
                //     The domNode to return when the listener is fired

                var target = node.querySelector('[data-havok-click-target]') || node;
                node.setAttribute('data-havok-handler-id', this._handlerId);
                this.addHandler(on(target, a11yclick.click, lang.hitch(this, function(e){
                    this.onClick(e, node);
                })), this._handlerId);
                ++this._handlerId;
            },

            _removeClickHandler: function(/*DomNode*/node){
                this.removeHandlers(node.getAttribute('data-havok-handler-id'));
            },

            onClick: function(/*Event*/e, /*DomNode*/node){
                if (domClass.contains(e.target, 'disabled') || domClass.contains(node, 'disabled')){
                    e.preventDefault();
                    return;
                }
                if (e.target.tagName == 'A' && e.target.getAttribute('href')) return

                e.preventDefault();
                this.set('active', node);
                this.emit('item-click', {item: node});
            }
        }
    );

    /*=====
    ListMixin.__AddOptions = __AddOptions;
    =====*/

    return ListMixin;
});
