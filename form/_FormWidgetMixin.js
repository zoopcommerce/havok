define([
    'dojo/_base/declare',
    'dojo/string',
    './_LabelMixin',
    './_HelpMessagesMixin',
    './_RequiredStarMixin',
    'dojo/text!./template/Control.html'
],
function (
    declare,
    string,
    LabelMixin,
    HelpMessagesMixin,
    RequiredStarMixin,
    controlTemplate
){
    return declare(
        [LabelMixin, HelpMessagesMixin, RequiredStarMixin],
        {
            buildRendering: function(){
                this.templateString = string.substitute(controlTemplate, {input: this.templateString});
                this.inherited(arguments);
            }
        }
    );
});
