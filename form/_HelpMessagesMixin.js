define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/query',
    './_MessagesMixin'
],
function (
    declare,
    lang,
    array,
    query,
    MessagesMixin
){
    return declare(
        [MessagesMixin],
        {
            // Adds a help messages to form inputs
            //

            // _helpMessageObjects: string,
            //_helpMessageObjects: undefined,

            buildRendering: function(){

                var helpMessages;

                if (this.srcNodeRef){
                    helpMessages = query('[data-dojo-attach-point=helpMessages]>*', this.srcNodeRef).map(function(node){
                        return node.innerHTML;
                    })
                }

                this.inherited(arguments);

                if (helpMessages.length > 0){
                    this.set('helpMessages', helpMessages);
                }
            },

            _setHelpMessagesAttr: function(messages) {

                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._helpMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatHelpMessage)),
                    this._helpMessageObjects
                );

                this._set('helpMessages', messages);
            },

            formatHelpMessage: function(message){
                return '<span class="muted">'+message+'</span>';
            }
        }
    );
});
