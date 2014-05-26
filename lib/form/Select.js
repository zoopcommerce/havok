define([
    'dojo/_base/declare',
    '../widget/DropdownToggle',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_DropdownMixin',
    'dojo/text!./template/Select.html',
    '../less!bootstrap/less/buttons.less',
    '../widget/Dropdown'
],
function (
    declare,
    DropdownToggle,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    DropdownMixin,
    template
){
    // module:
    //    	havok/form/Select

    return declare(
        [DropdownToggle, WidgetsInTemplateMixin, FormWidgetMixin, DropdownMixin],
        {
            // summary:
            //      A nicely styled select input

            // templateString: String
            templateString: template,

            buildRendering: function(){

                this.inherited(arguments);
            },

            _setValueAttr: function(value){

                var node = this.dropdown.containerNode.querySelector('[data-havok-store-id=id-' + value + ']');
                if (node) this.input.value = node.getAttribute('data-havok-store-text').substring(5)
                else this.input.value = ''

                this._set('value', value);
            }
        }
    )
});
