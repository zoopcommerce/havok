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
            _renderGroup: function(item){
                var dropdown = new declare([Dropdown, StoreMixin], {})({store: this.store, query: {parent: item[this.store.idProperty]}}),
                    link = this._renderLink(item).firstElementChild,
                    submenu = this.isInstanceOf(Dropdown) ?
                        new DropdownSubmenu({dropdown: dropdown, button: link, tag: 'li'}) :
                        new DropdownToggle({dropdown: dropdown, button: link, tag: 'li'});

                this.containerNode.appendChild(submenu.domNode);
                submenu.containerNode.appendChild(link);
                submenu.startup();
                dropdown.startup();
                return submenu.domNode;
            }
        }
    );
});
