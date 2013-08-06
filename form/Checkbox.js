define([
    'dojo/_base/declare',
    '../widget/_WidgetBase',
    './_FormWidgetMixin',
    'dojo/text!./template/Checkbox.html',
    '../less!./less/checkbox.less'
],
function(
    declare,
    WidgetBase,
    FormWidgetMixin,
    template
){
    // module:
    //		havok/form/Checkbox

    return declare
    (
        [WidgetBase, FormWidgetMixin],
        {
            templateString: template,

            value: false,

            onClick: function(){
                this.checkbox.checked = !this.checkbox.checked;
                this.set('value', this.checkbox.checked);
            }
        }
    );
});
