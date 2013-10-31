define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/on',
    'dojo/keys',
    'dijit/focus',
    './_DropdownBase',
    './_ListMixin'
],
function (
    declare,
    lang,
    query,
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

            //This is a really basic dropdown. It doesn't do much except
            //show a list of links.
            //

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
                        nodeList,
                        direction = up ? 'previousElementSibling' : 'nextElementSibling';

                    while (parent !== this.containerNode){
                        node = node.parentElement;
                        parent = node.parentElement;
                    }
                    while (node[direction]){
                        node = node[direction];
                        nodeList = query('A', node);
                        if (nodeList.length > 0){
                            focus.focus(nodeList[0]);
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