define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_DropdownMixin',
    'dojo/text!./template/Select.html',
    '../widget/DropdownToggle',
    '../widget/Dropdown',
    '../less!bootstrap/less/buttons.less'
],
function (
    declare,
    WidgetBase,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    DropdownMixin,
    template
){
    // module:
    //    	havok/form/Select

    return declare(
        [WidgetBase, WidgetsInTemplateMixin, FormWidgetMixin, DropdownMixin],
        {
            // summary:
            //      A nicely styled select input

            // templateString: String
            templateString: template,

            _setClassAttr: { node: "input", type: "class" },

            _setValueAttr: function(value){
                var node = this.dropdown.containerNode.querySelector('[data-havok-store-id=id-' + value + ']');

                if (node) this.input.value = node.getAttribute('data-havok-store-text').substring(5)
                else this.input.value = ''

                this._set('value', value);
            }
        }
    )
});
