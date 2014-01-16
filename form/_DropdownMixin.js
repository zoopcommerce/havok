define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    '../less!./less/dropdownmixin.less'
],
function (
    declare,
    lang,
    array,
    string
){
    // module:
    //    	havok/form/_DropdownMixin

    return declare(
        [],
        {
            // summary:
            //      Mixin for form inputs that use a dropdown

            /*=====
            // placeholder: String
            placeholder: undefined,
            =====*/

            /*=====
            // dropdown: DomNode
            dropdown: undefined,
            =====*/

            /*=====
            // dropdownToggle: DomNode
            dropdownToggle: undefined,
            =====*/

            toggleTag: 'div',

            optionTemplate: '<li data-havok-store-id="id-${value}" data-havok-store-text="text-${text}"><a href="">${text}</a></li>',

            buildRendering: function(){

                if (this.inline) this.toggleTag = 'span';

                var options;

                if (this.srcNodeRef) {
                    options = array.map(this.srcNodeRef.getElementsByTagName('OPTION'), lang.hitch(this, function(option){
                        return string.substitute(this.optionTemplate, option);
                    }));
                }
                this.inherited(arguments);

                if (this.store) {
                    // using a store, so add the required mixins to dropdown
                    this.dropdown.storeHost = this;
                    if (!this.dropdown.storeItemTemplate) this.dropdown.mixinAdapter('./_StoreAdapterMixin');
                    this.dropdown.refresh();
                } else if (options) {
                    array.forEach(options, lang.hitch(this.dropdown, this.dropdown.addItem));
                }
            },

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder', this.placeholder);
                this.dropdown.on('item-click', lang.hitch(this, function(e){
                    this.dropdownToggle.hide();
                    this.set('value', e.item.getAttribute('data-havok-store-id').replace('id-', ''));
                }));

                this.dropdownToggle.watch('hidden', lang.hitch(this, function(p, o, n){
                    if (!n) this.dropdown.domNode.style.width = this.dropdownToggle.domNode.offsetWidth + 'px';
                }))
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){
                return this.dropdown.addItem(item, options);
            },

            refresh: function(){
                return this.dropdown.refresh();
            },

            _setValueAttr: function(value){
                var node;
                if (node = this.dropdown.containerNode.querySelector('[data-havok-store-id=id-' + value + ']')){
                    this.input.value = node.getAttribute('data-havok-store-text').substring(5);
                } else {
                    this.input.value = '';
                }
                this._set('value', value);
            },

            _setPlaceholderAttr: function(value) {
                if (!value) value = this.get('label');
                this.input.setAttribute('placeholder', value);
                this._set('placeholder', value)
            },

            onBlur: function(){
                this._dropdownBlur = true;
                this.inherited(arguments);
                this._dropdownBlur = false;
            },

            _setPostActivityAttr: function(value) {
                if (this._dropdownBlur) {
                    setTimeout(lang.hitch(this, function(){
                        this._set('postActivity', value)
                    }), 200);
                } else {
                    this._set('postActivity', value)
                }
            }
        }
    )
});
