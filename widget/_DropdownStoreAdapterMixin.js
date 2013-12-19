define([
    'dojo/_base/declare',
    './Dropdown',
    './_StoreMixin',
    './DropdownToggle',
    './DropdownSubmenu',
    './_StoreAdapterMixin'
],
function (
    declare,
    Dropdown,
    StoreMixin,
    DropdownToggle,
    DropdownSubmenu,
    StoreAdapterMixin
){
    return declare(
        [StoreAdapterMixin],
        {
            _renderGroup: function(domNode, data){
                var dropdown = new declare([Dropdown, StoreMixin], {})({store: this.store, query: {parent: data[this.store.idProperty]}}),
                    submenu = this.isInstanceOf(Dropdown) ?
                        new DropdownSubmenu({dropdown: dropdown, button: domNode, tag: 'li'}) :
                        new DropdownToggle({dropdown: dropdown, button: domNode, tag: 'li'});

                this.containerNode.appendChild(submenu.domNode);
                submenu.containerNode.appendChild(domNode);
                submenu.startup();
                return submenu.domNode;
            }
        }
    );
});
