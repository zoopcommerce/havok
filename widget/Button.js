define([
    'dojo/_base/declare',
    './_WidgetBase',
    './_KeypressMixin',
    'dojo/text!./template/Button.html',
    '../less!../vendor/bootstrap/less/buttons.less'
],
function (
    declare,
    WidgetBase,
    KeypressMixin,
    template
){
    // module:
    //    	havok/widget/Button

    return declare(
        [WidgetBase, KeypressMixin],
        {

            templateString: template,

            text: '',

            buildRendering: function(){
                if (this.srcNodeRef){
                    this.text = this.srcNodeRef.innerHTML;
                }
                this.inherited(arguments);
            }
        }
    );
});
