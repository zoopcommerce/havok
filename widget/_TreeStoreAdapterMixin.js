define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/dom-attr',
    'dojo/dom-construct'
],
function (
    declare,
    lang,
    when,
    domAttr,
    domConstruct
){
    return declare(
        [],
        {
            queryOptions: {
                //this sort function ensures that folders always appear at the top of a list
                sort: function(a, b){
                    if (a.type == 'group' && b.type != 'group') return -1;
                    if (a.type != 'group' && b.type == 'group') return 1;
                    return 0;
                }
            },

            _renderGroup: function(item, data){

                var outerItem = domConstruct.place('<li><ol></ol></li>', item, 'after');
                domConstruct.place(item, outerItem, 'first');

                return outerItem;
            },

            onClick: function(e, item){

                var innerParent = item.lastElementChild;

                if (item.children.length > 1 && innerParent.children.length == 0){
                    when(this.get('store'), lang.hitch(this, function(store){
                        when(store.query(lang.mixin(this.get('query'), {parent: domAttr.get(item, 'data-havok-store-id')}), this.get('queryOptions')), lang.hitch(this, function(data){
                            for (var i = 0; i < data.length; i++){
                                this.addItem(data[i], {fromStore: true, refNode: innerParent, storeId: data[i][this.store.idProperty]});
                            }
                        }));
                    }))
                }

                this.inherited(arguments);
            }
        }
    );
});
