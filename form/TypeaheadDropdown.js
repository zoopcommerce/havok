define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-construct',
    '../widget/Dropdown'
],
function (
    declare,
    lang,
    array,
    string,
    domConstruct,
    Dropdown
){
    // module:
    //    	havok/form/TypeaheadDropdown

    return declare(
        [Dropdown],
        {

            //re: undefined,

            _highlight: function(text){
                return text.replace(this.re, function($1, match){
                    return '<strong>' + $1 + '</strong>';
                });
            },

            _createLink: function(item){
                domConstruct.place(
                    '<li>' + string.substitute(this.linkTemplate, lang.mixin({href: ''}, item, {text: this._highlight(item.text)})) + '</li>',
                    this.containerNode,
                    'last'
                );
            },

            _refresh: function(data){
                this.inherited(arguments);

                //apply highlighting
                for (var i = 0; i < data.length; i++){
                    this.containerNode.children[i].firstElementChild.innerHTML = this._highlight(data[i].text);
                }
            }
        }
    );
});
