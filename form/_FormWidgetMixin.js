define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './_LabelMixin',
    './_HelpMessagesMixin',
    './_RequiredStarMixin',
    './_ActivityMixin'
],
function (
    declare,
    domClass,
    LabelMixin,
    HelpMessagesMixin,
    RequiredStarMixin,
    ActivityMixin
){
    return declare(
        [LabelMixin, HelpMessagesMixin, RequiredStarMixin, ActivityMixin],
        {
            //inline: false,

            inlineTemplate: '<span data-dojo-attach-point="inputContainer">${input}</span>',

            blockTemplate: '<div class="control-group"><div class="controls" data-dojo-attach-point="inputContainer">${input}<span data-dojo-attach-point="messagesNode"></span></div></div>',

            buildRendering: function(){
                if (this.inline){
                    this.templateString = this.inlineTemplate.replace('${input}', this.templateString);
                } else {
                    this.templateString = this.blockTemplate.replace('${input}', this.templateString);
                }
                this.inherited(arguments);

                domClass.remove(this.domNode, this.baseClass);
                domClass.add(this.inputContainer.firstElementChild, this.baseClass);
            }
        }
    );
});
