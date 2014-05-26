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

                var rendered = this._rendered,
                    prepend = rendered ? [] : this._argToArray(this.prepend),
                    append = rendered ? [] : this._argToArray(this.append);

                this.prepend = [];
                this.append = [];

                if (this.srcNodeRef){

                    var i,
                        nodes;

                    nodes = this.srcNodeRef.querySelectorAll('[append],[data-havok-append],[data-dojo-props*="\\"append\\":true"]');
                    for (i = 0; i < nodes.length; ++i) {
                        nodes[i].setAttribute('data-havok-append', true);
                        nodes[i].removeAttribute('append');
                        append.unshift(nodes[i])
                    }

                    nodes = this.srcNodeRef.querySelectorAll('[prepend],[data-havok-prepend],[data-dojo-props*="\\"prepend\\":true"]');
                    for (i = 0; i < nodes.length; ++i) {
                        nodes[i].setAttribute('data-havok-prepend', true);
                        nodes[i].removeAttribute('prepend');
                        prepend.unshift(nodes[i])
                    }
                }

                this.inherited(arguments);

                if (!rendered){
                    this.set('prepend', prepend);
                    this.set('append', append);
                } else {
                    this.prepend = prepend;
                    this.append = append;
                }
            },

            addPrependage: function(/*String|DomNode*/value){
                this.prepend.push(value);
                this.set('prepend', this.prepend);
            },

            addAppendage: function(/*String|DomNode*/value){
                this.append.push(value);
                this.set('append', this.append);
            },

            _argToArray: function(value){
                if (lang.isArray(value)) return value.slice() //make a shallow clone of array
                else if (value) return [value]
                else return []
            },

            _setPrependAttr: function(/*String|String[]|DomNode|DomNode[]*/value){

                var index;

                value = this._argToArray(value);
                for (index in value) value[index] = this._createNode(value[index], true);

                this._removeAppendages(value, true);
                for (index in value) this._addAppendage(value[index]);
                this._set('prepend', value);
            },

            _setAppendAttr: function(/*String|String[]|DomNode|DomNode[]*/value){

                var index;

                value = this._argToArray(value);
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
