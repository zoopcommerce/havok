define([
    'dojo/_base/declare',
    './_WidgetBase',
    './_ListMixin',
    '../less!bootstrap/less/navs.less'
],
function (
    declare,
    WidgetBase,
    ListMixin
){
    // module:
    //    	havok/widget/_NavBase

    return declare(
        [WidgetBase, ListMixin],
        {
            // summary:
            //      Base class for navigation list widgets

            storeAdapter: './_DropdownStoreAdapterMixin',

            // tag: String
            tag: 'ul',

            // baseClass: String
            baseClass: 'nav',

            addWDropdownToggle: function(/*DomNode*/item){
                return item;
            }
        }
    );
});
