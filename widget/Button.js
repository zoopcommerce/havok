define([
    'dojo/_base/declare',
    './_WidgetBase',
    '../less!../vendor/bootstrap/less/buttons.less'
],
function (
    declare,
    WidgetBase
){
    // module:
    //    	havok/widget/Button

    return declare(
        [WidgetBase],
        {
            // summary:
            //      A widgetised button

            //baseClass: String
            baseClass: 'btn',

            //templateString: String
            templateString: '<button data-dojo-attach-point="button">${!text}</button>',

            /*=====
            // text: String
            //      The text to be displayed on the button
            text: undefined,
            =====*/

            buildRendering: function(){
                if (!this.text){
                    if (this.srcNodeRef){
                        this.text = this.srcNodeRef.innerHTML;
                    } else {
                        this.text = '';
                    }
                }
                this.inherited(arguments);
            }
        }
    );
});
