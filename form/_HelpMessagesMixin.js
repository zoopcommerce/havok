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

                var i,
                    helpMessages = [],
                    node;

                if (this.srcNodeRef){
                    for (i = 0; i < this.srcNodeRef.children.length; i++){
                        node = this.srcNodeRef.children[i];
                        if (node.hasAttribute('help-message')){
                            helpMessages.push(node.innerHTML)
                        }
                    }
                }

                this.inherited(arguments);

                if (helpMessages.length > 0) this.set('helpMessages', helpMessages);
            },

            _setHelpMessagesAttr: function(/*String|String[]*/messages) {

                if (typeof messages == 'string' && messages.substring(0,1) == '[') messages = JSON.parse(messages);
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
