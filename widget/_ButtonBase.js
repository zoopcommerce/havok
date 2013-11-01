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

            baseClass: 'btn',

            templateString: '<button>${!text}</button>',

            //text: undefined,

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
