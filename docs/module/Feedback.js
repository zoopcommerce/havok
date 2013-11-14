define([
    'dojo/_base/declare',
    'dojo/dom-class',
    '../../widget/_WidgetBase',
    'dojo/text!./template/Feedback.html',
    '../../less!./less/feedback.less'
],
function (
    declare,
    domClass,
    WidgetBase,
    template
){
    // module:
    //    	havok/docs/module/Feedback

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
