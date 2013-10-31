define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/query',
    'dojo/on',
    'dojo/keys',
    'dijit/focus',
    '../string',
    'dojo/dom-class',
    'dojo/dom-construct',
    './DropdownSubmenu',
    './_DropdownBase',
    './_ListMixin'
],
function (
    declare,
    lang,
    array,
    query,
    on,
    keys,
    focus,
    string,
    domClass,
    domConstruct,
    DropdownSubmenu,
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

//            _getQueryAttr: function(){
//                return lang.mixin({parent: undefined}, this.query);
//            },

//            _createNode: function(item){
//
//                if (item.type){
//                    this['_create' + array.map(item.type.split('-'), function(part){return string.ucFirst(part)}).join('')](item);
//                } else {
//                    this._createLink(item);
//                }
//
//                return this.containerNode.lastElementChild;
//            },
//
//            _createDisabled: function(item){
//                domConstruct.place(string.substitute('<li>' + this.linkTemplate, lang.mixin({href: ''}, item)) + '</li>', this.containerNode, 'last');
//                domClass.add(this.containerNode.lastElementChild, 'disabled');
//            },
//
//            _createDivider: function(item){
//                domConstruct.place(string.substitute(this.dividerTemplate, item), this.containerNode, 'last');
//            },
//
//            _createNavHeader: function(item){
//                domConstruct.place(string.substitute(this.headerTemplate, item), this.containerNode, 'last');
//            },
//
//            _createDropdown: function(item){
//                var dropdown = new DropdownSubmenu({
//                    tag: 'li',
//                    innerHTML: string.substitute(this.linkTemplate, lang.mixin({href: ''}, item)),
//                    dropdown: new Dropdown({
//                        store: this.store,
//                        query: {parent: item[this.store.idProperty]}
//                    })
//                });
//                this.containerNode.appendChild(dropdown.domNode);
//                dropdown.startup();
//                this.watchChildHasMouse(dropdown);
//            },
//
//            _createLink: function(item){
//                domConstruct.place(
//                    '<li>' + string.substitute(this.linkTemplate, lang.mixin({href: ''}, item)) + '</li>',
//                    this.containerNode,
//                    'last'
//                );
//            },

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