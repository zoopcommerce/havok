define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/string',
    'dojo/dom-construct'
],
function (
    declare,
    lang,
    when,
    string,
    domConstruct
){

    return declare(
        [],
        {
            // storeHost: undefined,

            storeItemTemplate: '<a ${attr} href="${href}">${text}</a>',

            buildRendering: function(){
                if (!this.storeHost) this.storeHost = this;
                this.inherited(arguments);
            },

            _setActiveAttr: function(value){
                if (typeof value == 'string'){
                    var nodes = this.containerNode.querySelectorAll('[data-havok-store-id=' + value + ']');
                    if (nodes.length > 0){
                        value = nodes[0];
                    }
                }
                this.inherited(arguments, [value]);
            },

            _renderNodes: function(){
                when(this.storeHost.get('data'), lang.hitch(this, function(data){
                    for (var i = 0; i < data.length; i++){
                        this.addItem(data[i], {fromStore: true, storeId: data[i][this.storeHost.store.idProperty]});
                    }
                    if (this.active) this.set('active', this.active);
                }));
            },

            addItem: function(item, options){
                if (!options) options = {};

                if (options.fromStore){
                    //the item object is from a store, and needs to be transformed into a html fragment
                    var node,
                        vars = {attr: '', href: '', storeId: item[this.storeHost.store.idProperty]};

                    if (item.disabled){
                        vars.attr = 'class="disabled"';
                    }
                    if (item.type == 'nav-header') {
                        vars.attr = 'class="nav-header"';
                    }
                    if (item.type == 'divider'){
                        node = this.dividerTemplate;
                    } else {
                        lang.mixin(vars, item);
                        node = string.substitute(this.storeItemTemplate, vars);
                    }
                    if (item.type == 'group') node = this._renderGroup(domConstruct.place(node, this.containerNode), item);
                    item = node;
                }

                item = this.inherited(arguments);
                item.setAttribute('data-havok-store-id', options.storeId);
                return item;
            }
        }
    );
});
