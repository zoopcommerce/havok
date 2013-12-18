define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/keys',
    'dijit/focus',
    './_DropdownBase',
    './_ListMixin'
],
function (
    declare,
    lang,
    on,
    keys,
    focus,
    DropdownBase,
    ListMixin
){
    // module:
    //    	havok/widget/Dropdown

    return declare(
        [DropdownBase, ListMixin],
        {
            // summary:
            //      A dropdown to display a list of links.

            storeAdapter: './_DropdownStoreAdapterMixin',
            
            startup: function(){
                this.inherited(arguments);
                this._addKeypressHandler();
            },

            destroy: function(){
                this._removeKeypressHandler();
                this.inherited(arguments);
            },

            _removeKeypressHandler: function(){
                if (this._keypressHandler){
                    this._keypressHandler.remove();
                }
            },

            _addKeypressHandler: function(){

                var moveFocus = lang.hitch(this, function(up){
                    var node = document.activeElement,
                        parent,
                        nodeChild,
                        direction = up ? 'previousElementSibling' : 'nextElementSibling';

                    while (parent !== this.containerNode){
                        node = node.parentNode;
                        parent = node.parentNode;
                    }
                    while (node[direction]){
                        node = node[direction];
                        nodeChild = node.querySelector('a');
                        if (nodeChild){
                            focus.focus(nodeChild);
                            return;
                        }
                    }
                });

                this._keypressHandler = on(this.domNode, 'keydown', lang.hitch(this, function(evt){
                    if (evt.keyCode == keys.UP_ARROW){
                        moveFocus(true);
                        evt.preventDefault();
                    } else if (evt.keyCode == keys.DOWN_ARROW) {
                        moveFocus(false);
                        evt.preventDefault();
                    }
                }))
            }
        }
    );
});