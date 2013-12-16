define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/registry'
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

            /*=====
            // prepend: String|String[]|DomNode|DomNode[]
            prepend: undefined,
            =====*/

            /*=====
            // append: String|String[]|DomNode|DomNode[]
            append: undefined,
            =====*/

            /*=====
            // appendagesWrapper: DomNode
            appendagesWrapper: undefined,
            =====*/

            buildRendering: function(){
                if (this.srcNodeRef){

                    var i,
                        node,
                        widget,
                        prepend = [],
                        append = [];

                    for (i = 0; i < this.srcNodeRef.children.length; i++){
                        node = this.srcNodeRef.children[i];
                        if (node.getAttribute('widgetId')){
                            widget = registry.getEnclosingWidget(node);
                            if (widget.append == '') append.unshift(node);
                            if (widget.prepend == '') prepend.unshift(node);
                        } else if (node.hasAttribute('append')){
                            append.unshift(node);
                        } else if (node.hasAttribute('prepend')){
                            prepend.unshift(node);
                        }
                    }

                    if (prepend.length > 0) this.prepend = prepend;
                    if (append.length > 0) this.append = append;
                }
                this.inherited(arguments);
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

                if (typeof value == 'string' && value.substring(0,1) == '[') value = JSON.parse(value)
                if ( ! lang.isArray(value)) value = [value];
                for (index in value) value[index] = this._createNode(value[index], true);

                this._removeAppendages(value, true);
                for (index in value) this._addAppendage(value[index]);
                this._set('prepend', value);
            },

            _setAppendAttr: function(/*String|String[]|DomNode|DomNode[]*/value){

                var index;

                if (typeof value == 'string' && value.substring(0,1) == '[') value = JSON.parse(value)
                if ( ! lang.isArray(value)) value = [value];
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

                if (typeof(value) == 'string') {
                    node = domConstruct.create('span', {'class': 'add-on', innerHTML: value});
                } else {
                    node = value;
                }

                if (value.tagName == 'SPAN'){
                    domClass.add(value, 'add-on');
                } else if (value.tagName == 'BUTTON'){
                    domClass.add(value, 'btn');
                }

                node.prepend = prepend;

                return node;
            },

            _removeAppendages: function(value, prepend){

                var i,
                    j,
                    item,
                    list,
                    match;

                if (prepend){
                    list = this.prepend;
                } else {
                    list = this.append;
                }

                if (!list) return

                for(i = 0; i < list.length; i++){
                    match = false;
                    item = list[i];
                    for (j = 0; j < value.length; j++){
                        if (value[j] == item){
                            match = true;
                        }
                    }
                    if (!match) domConstruct.destroy(item);
                }
            },

            _addAppendage: function(node){

                if (! this.appendagesWrapper) this._createAppendagesWrapper();

                if (node.prepend){
                    domClass.add(this.appendagesWrapper,'input-prepend');
                } else {
                    domClass.add(this.appendagesWrapper,'input-append');
                }

                domConstruct.place(
                    node,
                    this.input,
                    node.prepend ? 'before' : 'after'
                );
            }
        }
    );
});
