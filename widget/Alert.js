define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_HideableMixin',
    'dojo/text!./template/Alert.html',
    'dojo/text!./template/CloseButton.html',
    '../less!../vendor/bootstrap/less/close.less',
    '../less!../vendor/bootstrap/less/buttons.less',
    '../less!../vendor/bootstrap/less/button-groups.less',
    '../less!../vendor/bootstrap/less/alerts.less'
],
function (
    declare,
    domClass,
    Widget,
    TemplatedMixin,
    HideableMixin,
    template,
    closeButtonTemplate
){
    // module:
    //    	havok/widget/Alert

    return declare(
        [Widget, TemplatedMixin, HideableMixin],
        {
            templateString: template,

            closeButtonTemplate: closeButtonTemplate,

            onCloseClick: function(e){
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
