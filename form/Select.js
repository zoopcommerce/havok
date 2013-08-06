define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_DropdownMixin',
    'dojo/text!./template/Select.html',
    '../widget/DropdownToggle',
    '../widget/Dropdown',
    '../less!./less/select.less'
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
            templateString: template
        }
    )
});
