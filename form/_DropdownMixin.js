define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
    'dojo/dom-attr',
    'dojo/dom-style',
    '../less!./less/dropdownmixin.less'
],
function (
    declare,
    lang,
    array,
    when,
    domAttr,
    domStyle
){
    return declare(
        [],
        {

            //placeholder: undefined string

            buildRendering: function(){

                var data;

                if (this.srcNodeRef && this.srcNodeRef.options) {
                    //store doesn't exist, so create it from the options inside srcNode
                    data = array.map(this.srcNodeRef.options, lang.hitch(this, function(option){
                        return {id: option.value, text: option.text, type: 'link'};
                    }));
                }
                this.inherited(arguments);

                if (data){
                    this.dropdown.set('store', {data: data});
                }
            },

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder', this.placeholder);
                this.dropdown.on('item-click', lang.hitch(this, function(e){
                    this.set('value', e.id);
                    this.textbox.value = e.text;
                    this.dropdownToggle.hide();
                }));
                domStyle.set(this.dropdown.containerNode, 'width', this.dropdownToggle.domNode.offsetWidth + 'px');
            },

            _setValueAttr: function(value){
                if (value){
                    when(this.get('store'), lang.hitch(this, function(store){
                        when(store.get(value), lang.hitch(this, function(item){
                            if (item){
                                this.textbox.value = item.text;
                            }
                        }))
                    }))
                }
                this._set('value', value);
            },

            _setStoreAttr: function(value){
                return this.dropdown.set('store', value);
            },

            _getStoreAttr: function(){
                return this.dropdown.get('store');
            },

            _setQueryAttr: function(value){
                return this.dropdown.set('query', value);
            },

            _getQueryAttr: function(){
                return this.dropdown.get('query');
            },

            _setQueryOptionsAttr: function(value){
                return this.dropdown.set('queryOptions', value);
            },

            _getQueryOptionsAttr: function(){
                return this.dropdown.get('queryOptions');
            },

            _setQueryThrottleAttr: function(value){
                return this.dropdown.set('queryThrottle', value);
            },

            _getQueryThrottleAttr: function(){
                return this.dropdown.get('queryThrottle');
            },

            _setPlaceholderAttr: function(value) {
                this.placeholder = value;

                if(this.placeholder) {
                    domAttr.set(this.textbox, 'placeholder', this.placeholder);
                } else if (this.label){
                    domAttr.set(this.textbox, 'placeholder', this.get('label'));
                }
            }
        }
    )
});
