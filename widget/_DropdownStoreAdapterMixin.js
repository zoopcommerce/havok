define([
    'dojo/_base/declare',
    './Dropdown',
    './DropdownToggle',
    './DropdownSubmenu',
    './_StoreMixin'
],
function (
    declare,
    Dropdown,
    DropdownToggle,
    DropdownSubmenu,
    StoreMixin
){
    return declare(
        [],
        {
            _renderGroup: function(item, data){
                var dropdown = new (declare([Dropdown, StoreMixin], {}))({store: this.store, query: {parent: data[this.store.idProperty]}}),
                    submenu;

                if (this.isInstanceOf(Dropdown)){
                    submenu = new DropdownSubmenu({dropdown: dropdown, button: item, tag: 'li'});
                } else {
                    submenu = new DropdownToggle({dropdown: dropdown, button: item, tag: 'li'});
                }
                this.containerNode.appendChild(submenu.domNode);
                submenu.containerNode.appendChild(item);
                submenu.startup();
                return submenu.domNode;
            }
        }
    );
});
