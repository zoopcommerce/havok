define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/dom-class',
    './_WidgetBase',
    './_ListMixin',
    '../less!./less/tree.less'
],
function (
    declare,
    domConstruct,
    domClass,
    WidgetBase,
    ListMixin
){
    // module:
    //    	havok/widget/Tree

    return declare(
        [WidgetBase, ListMixin],
        {
            baseClass: 'nav nav-list tree',

            tag: 'ol',

            storeAdapter: './_TreeStoreAdapterMixin',

            addItem: function(item){

                item = this.inherited(arguments);

                if (item.children.length > 1){
                    domClass.add(item, 'folder-close');
                    domConstruct.place('<span class="icon-folder"></span> ', item.firstElementChild, 'first');

                    var innerParent = item.lastElementChild,
                        i;
                    domClass.add(innerParent, 'nav nav-list');
                    for ( i = 0; i < innerParent.children.length; i++){
                        this.addItem(innerParent.children[i], {refNode: innerParent});
                    }
                } else {
                    domConstruct.place('<span class="icon-file-text"></span> ', item.firstElementChild, 'first');
                }

                return item;
            },

            onClick: function(e, item){

                if (domClass.contains(item, 'folder-open')){
                    domClass.remove(item, 'folder-open');
                    domClass.add(item, 'folder-close');
                } else if (domClass.contains(item, 'folder-close')){
                    domClass.remove(item, 'folder-close');
                    domClass.add(item, 'folder-open');
                }
                this.inherited(arguments);
                e.stopPropagation();
            }
        }
    );
});
