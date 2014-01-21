define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/string',
    'dojo/dom-class'
],
function (
    declare,
    lang,
    Deferred,
    when,
    string,
    domClass
){

    return declare(
        [],
        {
            // storeHost: undefined,

            storeItemTemplate: '<a class="${class}" href="${href}">${text}</a>',

            _setActiveAttr: function(value){
                if (typeof value == 'string'){
                    var nodes = this.containerNode.querySelectorAll('[data-havok-store-id=id-' + value + ']');
                    if (nodes.length > 0){
                        value = nodes[0];
                    }
                }
                this.inherited(arguments, [value]);
            },

            _getStoreHostAttr: function(){
                if (!this.storeHost) this.storeHost = this;
                return this.storeHost;
            },

            refresh: function(){
                var done = new Deferred;
                when(this.get('storeHost').get('queryResult'), lang.hitch(this, function(queryResult){
                    while (this.containerNode.children.length > 0){
                        this.removeItem(this.containerNode.children[0]);
                    }
if (!queryResult.forEach){
    var a = 1;
}
console.log(queryResult);
                    queryResult.forEach(lang.hitch(this, function(item){
                        this.addItem(item, {fromStore: true});
                    }));
                    if (this.active) this.set('active', this.active);
                    done.resolve();
                }));

                return done;
            },

            _renderNavHeader: function(item){
                var node = document.createElement('LI');
                node.innerHTML = string.substitute(
                    this.storeItemTemplate,
                    {
                        'class': ['nav-header'].concat(item['class']).join(' '),
                        href: item.href ? item.href : '',
                        text: item.text
                    }
                );
                return node;
            },

            _renderDivider: function(item){
                return document.createElement('HR');
            },

            _renderGroup: function(item){
                // add content in subclass
            },

            _renderLink: function(item){
                var node = document.createElement('LI');
                node.innerHTML = string.substitute(
                    this.storeItemTemplate,
                    {
                        'class': item['class'] ? item['class'] : '',
                        href: item.href ? item.href : '',
                        text: item.text
                    }
                );
                return node;
            },

            addItem: function(item, options){
                if (!options) options = {};

                if (options.fromStore){
                    //the item object is from a store, and needs to be transformed into a html fragment
                    options.storeId = item[this.storeHost.store.idProperty];
                    options.storeText = item.text;

                    var disabled = item.disabled;

                    switch (item.type){
                        case 'nav-header':
                            item = this._renderNavHeader(item)
                            break;
                        case 'divider':
                            item = this._renderDivider(item)
                            break;
                        case 'group':
                            item = this._renderGroup(item)
                            break;
                        default:
                            item = this._renderLink(item)
                    }

                    if (disabled) domClass.add(item, 'disabled');
                }

                item = this.inherited(arguments);
                item.setAttribute('data-havok-store-id', 'id-' + options.storeId);
                item.setAttribute('data-havok-store-text', 'text-' + options.storeText);
                return item;
            }
        }
    );
});
