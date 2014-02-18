define([
    'dojo/_base/declare',
    '../widget/Dropdown',
    '../widget/_StoreAdapterMixin'
],
function (
    declare,
    Dropdown,
    StoreAdapterMixin
){
    // module:
    //    	havok/form/_TypeaheadDropdown

    return declare(
        [Dropdown, StoreAdapterMixin],
        {
            re: /./,

            _renderLink: function(item){
                var node = this.inherited(arguments);
                node.firstElementChild.innerHTML = item.text.replace(this.re, function($1){
                    return '<strong>' + $1 + '</strong>';
                });
                return node;
            }
        }
    );
});
