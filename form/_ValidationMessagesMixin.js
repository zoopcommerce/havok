define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './_MessagesMixin'
],
function(
    declare,
    lang,
    array,
    MessagesMixin
){
    // module:
    //		havok/form/_ValidationMessagesMixin

    /*=====
    var __SuppressValidationMessages = {
        // preActivity: Boolean
        // postActivity: Boolean
    };
    =====*/

    return declare
    (
        [MessagesMixin],
        {
            // summary:
            //      Adds a validation messages to form inputs

            /*=====
            // suppressValidationMessages: __SuppressValidationMessages
            //      Should validation messages be suppressed or not?
            //      Can be set differently for preActivity and postActivity
            suppressValidationMessages: undefined,
            =====*/

            /*=====
            // _activeSuppressValidationMessages: Boolean
            //      Indicates if message suppression is active or not.
            _activeSuppressValidationMessages: undefined,
            =====*/

            /*=====
            // _validationMessageObjects: MessagesMixin.__MessageObject[]
            _validationMessageObjects: undefined,
            =====*/

            constructor: function(){
                this.suppressValidationMessages = {
                    preActivity: true
                }
            },

            startup: function(){
                this.inherited(arguments);

                //Set watchers
                this.watch('postActivity', lang.hitch(this, '_updateValidationMessages'));
            },

            _updateValidationMessages: function(){
                this.set('validationMessages', this.validationMessages); //trigger rerender
            },

            _setValidationMessagesAttr: function(messages) {
                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._validationMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatValidationMessage)),
                    this._validationMessageObjects
                );

                this._set('validationMessages', messages);
            },

            formatValidationMessage: function(/*String*/message){
                if ((this.postActivity && this.suppressValidationMessages.postActivity) ||
                    (!this.postActivity && this.suppressValidationMessages.preActivity)
                ){
                    return null;
                }
                return message;
            },

            _setSuppressValidationMessagesAttr: function(/*Boolean|__SuppressValidationMessages*/value){
                if (typeof value == 'string' && value.substring(0,1) == '{') value = JSON.parse(value);
                if (typeof value != 'object'){
                    value = {
                        preActivity: !!value,
                        postActivity: !!value
                    }
                }
                this._set('suppressValidationMessages', value);
                this._updateValidationMessages();
            }
        }
    );
});
