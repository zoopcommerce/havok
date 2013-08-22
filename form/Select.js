define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_DropdownMixin',
    'dojo/text!./template/Select.html',
    '../widget/DropdownToggle',
    '../widget/Dropdown'
],
function (
    declare,
    WidgetBase,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    DropdownMixin,
    template
){
    return declare(
        [WidgetBase, WidgetsInTemplateMixin, FormWidgetMixin, DropdownMixin],
        {
            templateString: template,

            _setClassAttr: { node: "textbox", type: "class" }
        }
    )
});
