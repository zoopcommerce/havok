define([
    'dojo/_base/declare',
    './_WidgetBase',
    './_ListMixin',
    '../less!../vendor/bootstrap/less/navs.less'
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

            tag: 'ul',

            baseClass: 'nav'
        }
    );
});
