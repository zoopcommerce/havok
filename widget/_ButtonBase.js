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
    //    	havok/widget/_ButtonBase

    return declare(
        [WidgetBase],
        {
            // summary:
            //      Base class for button widgets

            //baseClass: String
            baseClass: 'btn',

            //templateString: String
            templateString: '<button>${!text}</button>',

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

                this.button = this.domNode;
            }
        }
    );
});
