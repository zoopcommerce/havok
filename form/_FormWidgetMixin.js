define([
    'dojo/_base/declare',
    'dojo/string',
    './_LabelMixin',
    './_HelpMessagesMixin',
    './_RequiredStarMixin',
    'dojo/text!./template/BlockControl.html',
    'dojo/text!./template/InlineControl.html'
],
function (
    declare,
    string,
    LabelMixin,
    HelpMessagesMixin,
    RequiredStarMixin,
    blockControlTemplate,
    inlineControlTemplate
){
    return declare(
        [LabelMixin, HelpMessagesMixin, RequiredStarMixin],
        {
            //inline: false,

            buildRendering: function(){
                if (this.inline){
                    this.templateString = string.substitute(inlineControlTemplate, {input: this.templateString});
                } else {
                    this.templateString = string.substitute(blockControlTemplate, {input: this.templateString});
                }
                this.inherited(arguments);
            }
        }
    );
});
