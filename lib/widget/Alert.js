define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_WidgetBase',
    './_HideableMixin',
    'dojo/text!./template/CloseButton.html',
    '../less!./less/alerts.less'
],
function (
    declare,
    domClass,
    WidgetBase,
    HideableMixin,
    closeButtonTemplate
){
    // module:
    //    	havok/widget/Alert

    return declare(
        [WidgetBase, HideableMixin],
        {
            // summary:
            //      Hideable user alert

            // baseClass: String
            baseClass: 'alert',

            // templateString: String
            templateString: '<div>${!closeButtonTemplate}<span data-dojo-attach-point="containerNode"></span></div>',

            // closeButtonTemplate: String
            closeButtonTemplate: closeButtonTemplate,

            onCloseClick: function(/*Event*/e){
                e.preventDefault();
                this.hide();
            },

            _show: function(){
                domClass.remove(this.domNode, 'hide');
            },

            _hide: function(){
                domClass.add(this.domNode, 'hide');
            }
        }
    );
});
