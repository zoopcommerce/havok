define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../widget/DropdownToggle',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    'dojo/text!./template/ColorPicker.html',
    '../widget/ColorDropdown'
],
function (
    declare,
    lang,
    DropdownToggle,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    template
){
    // module:
    //    	havok/widget/ColorPicker

    return declare([DropdownToggle, WidgetsInTemplateMixin, FormWidgetMixin],
        {
            // summary:
            //      A form input that selects an RGB color value

            // templateString: template
            templateString: template,

            buildRendering: function(){

                if (this.inline) this.tag = 'span';

                this.inherited(arguments);

                //fixup attach points because dijit/_AttachMixin doesn't work properly for nested widgets
                this.swatch = this.domNode.querySelector('[data-dojo-attach-point="swatch"]');
                this.placementNode = this.domNode.querySelector('[data-dojo-attach-point="placementNode"]');
            },

            startup: function(){

                this.inherited(arguments);

                this.addHandler(this.dropdown.watch('value', lang.hitch(this, function(p, o, n){
                    this.set('value', n);
                })));
                this.watch('hidden', lang.hitch(this, function(p, o, n){
                    this.dropdown.set('value', this.value);
                }));
            },

            _setValueAttr: function(value){

                //update the swatch
                this.swatch.style.backgroundColor = value;

                if (this.dropdown) this.dropdown.set('value', value);
                this._set('value', value);
            }
        }
    );
});
