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

            optionTemplate: '<li data-havok-store-id="id-${value}"><a href="">${text}</a></li>',

            buildRendering: function(){

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
                    this.dropdown.storeItemTemplate = this.optionTemplate;
                    this.dropdown._mixinAdapter('./_StoreAdapterMixin');
                    this.dropdown._renderNodes();
                } else if (options) {
                    array.forEach(options, lang.hitch(this.dropdown, this.dropdown.addItem));
                }
            },

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder', this.placeholder);
                this.dropdown.on('item-click', lang.hitch(this, function(e){
                    this.set('value', e.item.getAttribute('data-havok-store-id').replace('id-', ''));
                    this.dropdownToggle.hide();
                }));
                this.dropdown.domNode.style.width = this.dropdownToggle.domNode.offsetWidth + 'px';
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){
                return this.dropdown.addItem(item, options);
            },

            _setValueAttr: function(value){
                this.input.value = this.dropdown.containerNode.querySelector('[data-havok-store-id=id-' + value + ']').firstElementChild.innerHTML;
                this._set('value', value);
            },

            _setPlaceholderAttr: function(value) {
                if (!value) value = this.get('label');
                this.input.setAttribute('placeholder', value);
                this._set('placeholder', value)
            }
        }
    )
});
