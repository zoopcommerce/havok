define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './_MessagesMixin'
],
function (
    declare,
    lang,
    array,
    MessagesMixin
){
    // module:
    //    	havok/form/_HelpMessagesMixin

    return declare(
        [MessagesMixin],
        {
            // summary:
            //      Adds a help messages to form inputs

            /*=====
            // _helpMessageObjects: MessagesMixin.__MessageObject[]
            _helpMessageObjects: undefined,
            =====*/

            buildRendering: function(){

                var helpMessagesNode,
                    i,
                    helpMessages = [];

                if (this.srcNodeRef && (helpMessagesNode = this.srcNodeRef.querySelector('[data-dojo-attach-point=helpMessages]'))){
                    for (i = 0; i < helpMessagesNode.children.lenght; i++) {
                        helpMessages.push(helpMessagesNode.children[i].innerHTML);
                    }
                }

                this.inherited(arguments);

                if (helpMessages.length > 0) this.set('helpMessages', helpMessages);
            },

            _setHelpMessagesAttr: function(/*String|String[]*/messages) {

                if (typeof messages == 'string') messages = [messages];

                this._helpMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatHelpMessage)),
                    this._helpMessageObjects
                );

                this._set('helpMessages', messages);
            },

            formatHelpMessage: function(/*String*/message){
                return '<span class="muted">'+message+'</span>';
            }
        }
    );
});
