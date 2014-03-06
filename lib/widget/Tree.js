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
            // summary:
            //      Creates a navigation tree

            // baseClass: String
            baseClass: 'nav nav-list tree',

            // tag: String
            tag: 'ol',

            // storeAdapter: String
            storeAdapter: './_TreeStoreAdapterMixin',

            // folderIcon: String
            folderIcon: '<i class="tree-icon fa fa-folder"></i>',

            // itemIcon: String
            itemIcon: '<i class="tree-icon fa fa-file-text"></i>',

            addItem: function(/*DomNode|String*/item, /*havok/widget/_ListMixin.__AddOptions?*/options){

                item = this.inherited(arguments);

                var newIcon,
                    oldIcon;

                if (item.children.length > 1){
                    domClass.add(item, 'folder-close');

                    newIcon = this.folderIcon;

                    var innerParent = item.lastElementChild,
                        i;
                    domClass.add(innerParent, 'nav nav-list');
                    for ( i = 0; i < innerParent.children.length; i++){
                        this.addItem(innerParent.children[i], {refNode: innerParent});
                    }
                } else {
                    newIcon = this.itemIcon
                }

                if (newIcon) {
                    if ((oldIcon = item.firstElementChild.querySelector('.tree-icon'))){
                        domConstruct.place(newIcon, oldIcon, 'replace')
                    } else {
                        domConstruct.place(newIcon, item.firstElementChild, 'first')
                    }
                }

                return item;
            },

            onClick: function(/*Event*/e, /*DomNode*/item){

                if (e === this._eHandled){
                    return;
                }

                if (domClass.contains(item, 'folder-open')){
                    domClass.remove(item, 'folder-open');
                    domClass.add(item, 'folder-close');
                } else if (domClass.contains(item, 'folder-close')){
                    domClass.remove(item, 'folder-close');
                    domClass.add(item, 'folder-open');
                }
                this.inherited(arguments);
                this._eHandled = e;
            }
        }
    );
});
