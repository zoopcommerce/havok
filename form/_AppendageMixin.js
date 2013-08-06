define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class'
],
function (
    declare,
    lang,
    array,
    on,
    domConstruct,
    domClass
){
    return declare(
        [],
        {

            // prepend: array
            //      An array of prepend nodes.
            //prepend: undefined,

            // append: array
            //      Same as prepend
            //append: undefined,

            buildRendering: function(){
                if (this.srcNodeRef && this.srcNodeRef.nodeName != 'SELECT'){

                    var i,
                        node,
                        doPrepend = true,
                        prepend = [],
                        append = [];
                    for (i = 0; i < this.srcNodeRef.children.length; i++){
                        node = this.srcNodeRef.children[i];
                        if (node.nodeName == 'INPUT' || node.nodeName == 'SELECT'){
                            doPrepend = false;
                            continue;
                        }
                        if (doPrepend){
                            prepend.unshift(node);
                        } else {
                            append.unshift(node);
                        }
                    }
                    if (prepend.length > 0){
                        this.prepend = prepend;
                    }
                    if (append.length > 0){
                        this.append = append;
                    }
                }
                this.inherited(arguments);
            },

            addPrependage: function(value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.append){
                    value = this.prepend.concat(value);
                }
                this.set('prepend', value);
            },

            addAppendage: function(value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.append){
                    value = this.append.concat(value);
                }
                this.set('append', value);
            },

            _setPrependAttr: function(value){

                var index;

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                for (index in value){
                    value[index] = this._createNode(value[index], true);
                }

                this._removeAppendages(value, true);
                for (index in value){
                    this._addAppendage(value[index]);
                }
                this._set('prepend', value);
            },

            _setAppendAttr: function(value){

                var index;

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                for (index in value){
                    value[index] = this._createNode(value[index], false);
                }

                this._removeAppendages(value, false);
                for (index in value){
                    this._addAppendage(value[index]);
                }
                this._set('append', value);
            },

            _createAppendagesWrapper: function(){
                this.appendagesWrapper = domConstruct.create('div', null, this.focusNode, 'after');
                domConstruct.place(this.focusNode, this.appendagesWrapper, 'first');
            },

            _createNode: function(value, prepend){

                if (typeof(value) == 'string'){
                    value = domConstruct.create('span', {innerHTML: value});
                }

                if (value.nodeName == 'SPAN'){
                    domClass.add(value, 'add-on');
                } else if (value.nodeName == 'BUTTON'){
                    domClass.add(value, 'btn');
                }

                value.prepend = prepend;

                return value;
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

                if (!list){
                    return
                }

                for(i = 0; i < list.length; i++){
                    match = false;
                    item = list[i];
                    for (j = 0; j < value.length; j++){
                        if (value[j] == item){
                            match = true;
                        }
                    }
                    if (!match){
                        domConstruct.destroy(item);
                    }
                }
            },

            _addAppendage: function(node){

                if (! this.appendagesWrapper){
                    this._createAppendagesWrapper();
                }

                if (node.prepend){
                    domClass.add(this.appendagesWrapper,'input-prepend');
                } else {
                    domClass.add(this.appendagesWrapper,'input-append');
                }

                domConstruct.place(
                    node,
                    this.textbox,
                    node.prepend ? 'before' : 'after'
                );
            }
        }
    );
});
