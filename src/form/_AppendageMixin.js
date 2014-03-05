define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/registry',
    '../less!./less/appendage.less'
],
function (
    declare,
    lang,
    domConstruct,
    domClass,
    registry
){
    // module:
    //    	havok/form/_AppendageMixin

    return declare(
        [],
        {
            // summary:
            //      Adds appendages to a textbox.

            // prepend: String|String[]|DomNode|DomNode[]
            prepend: [],

            // append: String|String[]|DomNode|DomNode[]
            append: [],

            /*=====
            // appendagesWrapper: DomNode
            appendagesWrapper: undefined,
            =====*/

            buildRendering: function(){

                var prepend = [],
                    append = [];

                if (this._rendered){
                    this.prepend = [];
                    this.append = [];
                }

                if (this.srcNodeRef){

                    var i,
                        node,
                        widget;

                    for (i = 0; i < this.srcNodeRef.children.length; i++){
                        node = this.srcNodeRef.children[i];
                        widget = registry.getEnclosingWidget(node);
                        if (widget && widget !== this){
                            if (widget.append === '') append.unshift(node)
                            else if (widget.prepend === '') prepend.unshift(node)
                        } else {
                            if (node.hasAttribute('append') || node.hasAttribute('data-havok-append')) append.unshift(node)
                            else if (node.hasAttribute('prepend') || node.hasAttribute('data-havok-prepend')) prepend.unshift(node)
                        }
                    }
                    if (!this._rendered){
                        if (prepend.length > 0) this.prepend = prepend;
                        if (append.length > 0) this.append = append;
                    }
                }

                this.inherited(arguments);

                if (this._rendered){
                    if (prepend.length > 0) this.prepend = prepend;
                    if (append.length > 0) this.append = append;
                }
            },

            addPrependage: function(/*String|String[]|DomNode|DomNode[]*/value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.prepend){
                    value = this.prepend.concat(value);
                }
                this.set('prepend', value);
            },

            addAppendage: function(/*String|String[]|DomNode|DomNode[]*/value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.append){
                    value = this.append.concat(value);
                }
                this.set('append', value);
            },

            _setPrependAttr: function(/*String|String[]|DomNode|DomNode[]*/value){

                var index;

                if ( ! lang.isArray(value)) value = [value];
                for (index in value) value[index] = this._createNode(value[index], true);

                this._removeAppendages(value, true);
                for (index in value) this._addAppendage(value[index]);
                this._set('prepend', value);
            },

            _setAppendAttr: function(/*String|String[]|DomNode|DomNode[]*/value){

                var index;

                if ( ! lang.isArray(value)) value = [value]
                else value = value.slice() //make a shallow clone of array
                for (index in value) value[index] = this._createNode(value[index], false);

                this._removeAppendages(value, false);
                for (index in value) this._addAppendage(value[index]);
                this._set('append', value);
            },

            _createAppendagesWrapper: function(){
                this.appendagesWrapper = domConstruct.create('div', null, this.input, 'after');
                domConstruct.place(this.input, this.appendagesWrapper, 'first');
            },

            _createNode: function(value, prepend){

                var node;

                prepend = prepend ? 'prepend' : 'append';

                if (typeof(value) == 'string') {
                    node = domConstruct.create('span', {'class': 'add-on', innerHTML: value});
                    node.setAttribute('data-havok-' + prepend, true);
                } else {
                    node = value;
                }

                if (value.tagName == 'SPAN') domClass.add(value, 'add-on')
                else if (value.tagName == 'BUTTON') domClass.add(value, 'btn')

                return node;
            },

            _removeAppendages: function(value, prepend){

                var i,
                    j,
                    item,
                    list,
                    match;

                if (prepend) list = this.prepend
                else list = this.append

                if (!list) return

                for(i = 0; i < list.length; i++){
                    match = false;
                    item = list[i];
                    for (j = 0; j < value.length; j++){
                        if (value[j] == item) match = true
                    }
                    if (!match) domConstruct.destroy(item)
                }
            },

            _addAppendage: function(node){

                if (! this.appendagesWrapper) this._createAppendagesWrapper();

                var prepend = node.hasAttribute('data-havok-prepend');
                domClass.add(this.appendagesWrapper,'input-' + (prepend ? 'prepend' : 'append'))
                domConstruct.place(node, this.input, prepend ? 'before' : 'after');
            }
        }
    );
});
