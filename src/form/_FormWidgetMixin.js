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
    // module:
    //    	havok/form/_FormWidgetMixin

    return declare(
        [LabelMixin, HelpMessagesMixin, RequiredStarMixin, ActivityMixin],
        {
            // summary:
            //      A mixin that groups all the standard behaviours for havok form inputs.

            /*=====
            // inline: Boolean
            //      Should the inline form template be used?
            //      Defaults to false.
            inline: false,
            =====*/

            // inlineTemplate: String
            //      The template to use when creating an inline form input
            inlineTemplate: '<span data-dojo-attach-point="inputContainer">${input}</span>',

            // blockTemplate: String
            //      The template to use when creating a block form input
            blockTemplate: '<div class="control-group"><div class="controls" data-dojo-attach-point="inputContainer">${input}<span data-dojo-attach-point="messagesNode"></span></div></div>',

            value: undefined,

            buildRendering: function(){
                if (this.inline || this.inline===''){
                    this.templateString = this.inlineTemplate.replace('${input}', this.templateString);
                } else {
                    this.templateString = this.blockTemplate.replace('${input}', this.templateString);
                }
                this.inherited(arguments);

                domClass.remove(this.domNode, this.baseClass);
                domClass.add(this.inputContainer.firstElementChild, this.baseClass);
            },

            reset: function(){
                this.set('value', undefined);
            }
        }
    );
});
