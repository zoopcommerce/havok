define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_FocusMixin'
],
function (
    declare,
    lang,
    FocusMixin
){

    return declare(
        [FocusMixin],
        {
            // Indicates if the ui element has had user interaction
            // postActivity will be set to true after the first blur event or
            // after the state first changes to an invalid value
            //postActivity: undefined,

            //_onFocusValue: undefined,

            startup: function(){
                this.inherited(arguments);

                this.watch('state', lang.hitch(this, function(property, oldValue, newValue){
                    //Watch the state if the state changes from valid to invalid,
                    //while in focus,
                    //and the value was not empty on focus,
                    //then postActivity should be set to true
                    if (newValue != '' &&
                        this._onFocusValue != undefined &&
                        this._onFocusValue != '' &&
                        this.get('focused')
                    ){
                        this.set('postActivity', true);
                    }
                }));
            },

            onFocus: function(){
                this.inherited(arguments);
                this._onFocusValue = this.get('value');
            },

            onBlur: function(){
                this.set('postActivity', true);
                this.inherited(arguments);
            }
        }
    );
});
