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

            optionTemplate: '<li data-havok-store-id="id-${value}" data-havok-store-text="text-${text}"><a href="">${text}</a></li>',

            buildRendering: function(){

                if (this.inline) this.tag = 'span';

                var options,
                    optionNodes;

                if (this.srcNodeRef) {
                    optionNodes = this.srcNodeRef.querySelectorAll('OPTION');
                    options = array.map(optionNodes, lang.hitch(this, function(option){
                        option.parentNode.removeChild(option);
                        return string.substitute(this.optionTemplate, option);
                    }));
                }

                this.inherited(arguments);

                if (this.store) {
                    // using a store, so add the required mixins to dropdown
                    this.dropdown.storeHost = this;
                    if (!this.dropdown.storeItemTemplate) this.dropdown.mixinAdapter('./_StoreAdapterMixin');
                } else if (options) {
                    array.forEach(options, lang.hitch(this.dropdown, this.dropdown.addItem));
                }
            },

            startup: function(){
                if (this.store) this.dropdown.refresh()

                this.inherited(arguments);

                this.set('placeholder', this.placeholder);
                this.addHandler(this.dropdown.on('item-click', lang.hitch(this, function(e){
                    this.hide();
                    this.set('value', e.item.getAttribute('data-havok-store-id').replace('id-', ''));
                })));

                this.watch('hidden', lang.hitch(this, function(p, o, n){
                    if (!n) {
                        this.dropdown.set('active', null);
                        this.dropdown.domNode.style.width = this.widthNode.offsetWidth + 'px';
                    }
                }))
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){
                return this.dropdown.addItem(item, options);
            },

            refresh: function(){
                return this.dropdown.refresh();
            },

            _setPlaceholderAttr: function(value) {
                if (!value) value = this.get('label');
                if (this._started) this.input.setAttribute('placeholder', value)
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
