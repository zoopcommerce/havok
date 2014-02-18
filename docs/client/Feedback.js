define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'havok/widget/_WidgetBase',
    'dojo/text!./template/Feedback.html',
    'havok/less!./less/feedback.less'
],
function (
    declare,
    domClass,
    WidgetBase,
    template
){
    // module:
    //    	docs/Feedback

    return declare(
        [WidgetBase],
        {
            templateString: template,

            onClick: function(){
                domClass.toggle(this.domNode, 'open');
            }
        }
    );
});
