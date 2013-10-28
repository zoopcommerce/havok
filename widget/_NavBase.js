define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
    'dojo/string',
    'dojo/dom-class',
    'dojo/dom-construct',
    './DropdownToggle',
    './Dropdown',
    './_WidgetBase',
    './_ListMixin',
//    'dojo/text!./template/NavLink.html',
//    'dojo/text!./template/NavHeader.html',
    '../less!../vendor/bootstrap/less/navs.less'
],
function (
    declare,
    lang,
    array,
    when,
    string,
    domClass,
    domConstruct,
    DropdownToggle,
    Dropdown,
    WidgetBase,
    ListMixin//,
//    linkTemplate,
//    headerTemplate
){
    // module:
    //    	havok/widget/_NavBase

    return declare(
        [WidgetBase, ListMixin],
        {

            tag: 'ul',

            baseClass: 'nav'

//            linkTemplate: linkTemplate,
//
//            headerTemplate: headerTemplate,

//            _setActiveAttr: function(value){
//                if (this.active){
//                    domClass.remove(this.active, 'active');
//                }
//                domClass.add(value, 'active');
//                this._set('active', value);
//            }/*,

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
//                var dropdown = new DropdownToggle({
//                    tag: 'li',
//                    innerHTML: string.substitute(this.linkTemplate, lang.mixin({href: ''}, item, {text: item.text + '<b class="caret"></b>'})),
//                    dropdown: new Dropdown({
//                        store: this.store,
//                        query: {parent: item[this.store.idProperty]}
//                    })
//                });
//                dropdown.startup();
//                this.containerNode.appendChild(dropdown.domNode);
//            },
//
//            _createLink: function(item){
//                domConstruct.place('<li>' + string.substitute(this.linkTemplate, lang.mixin({href: ''}, item)) + '</li>', this.containerNode, 'last');
//            }
//            */
        }
    );
});
