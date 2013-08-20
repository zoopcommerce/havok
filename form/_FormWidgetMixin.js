define([
    'dojo/_base/declare',
    'dojo/string',
    './_LabelMixin',
    './_HelpMessagesMixin',
    './_RequiredStarMixin',
    './_ActivityMixin'
],
function (
    declare,
    string,
    LabelMixin,
    HelpMessagesMixin,
    RequiredStarMixin,
    ActivityMixin
){
    return declare(
        [LabelMixin, HelpMessagesMixin, RequiredStarMixin, ActivityMixin],
        {
            //inline: false,

            inlineTemplate: '<span>${input}</span>',

            blockTemplate: '<div class="control-group"><div class="controls">${input}<span data-dojo-attach-point="messagesNode"></span></div></div>',

            buildRendering: function(){
                if (this.inline){
                    this.templateString = string.substitute(this.inlineTemplate, {input: this.templateString});
                } else {
                    this.templateString = string.substitute(this.blockTemplate, {input: this.templateString});
                }
                this.inherited(arguments);
            }
        }
    );
});
