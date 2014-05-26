define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/dom-class',
    'dojo/dom-construct',
    './_StoreAdapterMixin'
],
function (
    declare,
    lang,
    Deferred,
    when,
    domClass,
    domConstruct,
    StoreAdapterMixin
){
    return declare(
        [StoreAdapterMixin],
        {
            queryOptions: {
                //this sort function ensures that folders always appear at the top of a list
                sort: function(a, b){
                    if (a.type == 'group' && b.type != 'group') return -1;
                    if (a.type != 'group' && b.type == 'group') return 1;
                    return 0;
                }
            },

            _renderGroup: function(item){
                var outerItem = this._renderLink(item);
                domConstruct.place('<ol></ol>', outerItem, 'last');

                return outerItem;
            },

            onClick: function(/*Event*/e, /*DomNode*/node){
                this._fillFolder(node);
                this.inherited(arguments);
            },

            _fillFolder: function(item){

                var innerParent = item.lastElementChild,
                    result = new Deferred;

                if (item.children.length > 1 && innerParent.children.length == 0){
                    when(this.get('store'), lang.hitch(this, function(store){
                        when(store.query(lang.mixin(this.get('query'), {parent: item.getAttribute('data-havok-store-id').substring(3)}), this.get('queryOptions')), lang.hitch(this, function(data){
                            for (var i = 0; i < data.length; i++){
                                this.addItem(data[i], {fromStore: true, refNode: innerParent, storeId: data[i][this.store.idProperty]});
                            }
                            result.resolve();
                        }));
                    }));
                } else {
                    result.resolve();
                }

                return result;
            },

            _setActiveAttr: function(value){
                if (typeof value == 'string'){
                    //TODO this code below is seriously messy. Needs refactoring.
                    var findNode = new Deferred;
                    when(this.get('store'), lang.hitch(this, function(store){
                        var chain,
                            recurseDone = new Deferred,
                            recurseUp = function(id){
                                when(store.get(id), function(item){
                                    chain = lang.mixin({child: chain}, item);
                                    if (item.parent){
                                        recurseUp(item.parent);
                                    } else {
                                        recurseDone.resolve();
                                    }
                                });
                                return recurseDone;
                            },
                            recurseDown = lang.hitch(this, function(item, node){
                                for (var i = 0; i < node.children.length; i++){
                                    if (node.children[i].getAttribute('data-havok-store-id') == 'id-' + item.id){
                                        node = node.children[i];
                                        break;
                                    }
                                }
                                if (item.child){
                                    domClass.remove(node, 'folder-close');
                                    domClass.add(node, 'folder-open');
                                    this._fillFolder(node).then(lang.hitch(this, function(){
                                        recurseDown(item.child, node.lastElementChild);
                                    }))
                                } else {
                                    findNode.resolve(node);
                                }
                            })
                        recurseUp(value).then(lang.hitch(this, function(){
                            recurseDown(chain, this.containerNode);
                        }))
                    }))
                    findNode.then(lang.hitch(this, function(node){
                        this.set('active', node);
                    }))
                } else {
                    this.inherited(arguments);
                }
            }
        }
    );
});
