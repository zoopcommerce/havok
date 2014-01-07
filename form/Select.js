define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_DropdownMixin',
    'dojo/text!./template/Select.html',
    '../widget/DropdownToggle',
    '../widget/Dropdown',
    '../less!../vendor/bootstrap/less/buttons.less'
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

            _setClassAttr: { node: "input", type: "class" }
        }
    )
});
