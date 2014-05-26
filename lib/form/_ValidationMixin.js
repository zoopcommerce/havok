define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
    'dojo/Deferred',
    '../get!../validator/factory',
    'mystique/Result',
    './_ValidationStyleMixin',
    './_ValidationMessagesMixin',
    'mystique/Required',
    'mystique/NotRequired',
    'mystique/Chain'
],
function (
    declare,
    lang,
    array,
    when,
    Deferred,
    ValidatorFactory,
    Result,
    ValidationStyleMixin,
    ValidationMessagesMixin
){
    // module:
    //		havok/form/_ValidationMixin

    return declare(
        [ValidationStyleMixin, ValidationMessagesMixin],
        {
            // summary:
            //      Mixin that add validation to form inputs

            // state: [readonly] String
            //		Shows current state (ie, validation result) of input ('' | Incomplete | Error | Validating)
            //		An empty string indicates successful validation.
            //      State will start as `Validating` until validation has executed the first time.
            state: 'Validating',

            // validator: String|String[]|Object|mystique/Base
            validator: [],

            // suppressValidation: Boolean
            //      Set to true to stop all validation. Set to falsey to allow validation
            suppressValidation: false,

            // delay: int
            //     How long to delay validation after user input in milliseconds. Prevents validation on
            //     every single keystroke
            delay: 350,

            // required: Boolean
            required: false,

            /*=====
            // _delayTimer: Timer
            _delayTimer: undefined,
            =====*/

            // _setValueTimestamp: int
            _setValueTimestamp: 0,

            buildRendering: function(){

                if (this.srcNodeRef &&
                    (this.srcNodeRef.hasAttribute('required') ||
                    this.srcNodeRef.querySelector('INPUT[required]'))
                ){
                    this.required = true;
                }

                var required = this.required ? 'Required' : 'NotRequired';

                this.inherited(arguments);

                if (lang.isArray(this.validator)){
                    this.validator.unshift(required);
                } else if (this.validator) {
                    this.validator = [required, this.validator];
                } else {
                    this.validator = required;
                }
            },

            startup: function(){
                this.inherited(arguments);

                //Set watchers
                this.watch('value', lang.hitch(this, '_triggerValidate'));
                this.watch('postActivity', lang.hitch(this, 'updateValidationStyle'));//re-apply styles which may change postActivity

                //Trigger first validation
                this.validateNow();
            },

            _triggerValidate: function(property, oldValue, newValue){

                if (this.suppressValidation){
                    return;
                }

                if (this.focused) {
                    this._setValueTimestamp = new Date().getTime();
                    this.set('state', 'Validating');
                    this._startValidateTimer();
                } else {
                    this.validateNow();
                }
            },

            _setSuppressValidationAttr: function(/*Boolean*/value){
                if (this.state == 'Validating'){
                    this.set('state', '');
                }
                this._set('suppressValidation', value);
            },

            _setValidatorAttr: function(/*String|String[]|Object|mystique/Base*/value){
                // summary:
                //     Will set the validator. May be one of three
                //     types:
                //
                //     Instance of mystique/Base - the validator property is set equal to this instance.
                //
                //     Array - if an array, it is assumed to be an array of validators, or validator definitions.
                //     The array will be passed to validatorFactory.create(). The validator property
                //     will be set to the returned instance of Validator/Group
                //
                //     Object - an an object, it is assumbed to be a validator definition.
                //     The definition will be passed to havok/validator/factory.create(). The validator property
                //     will be set to the returned instance of mytique/Base

                var validatorDeferred = new Deferred;
                validatorDeferred.then(lang.hitch(this, function(validator){
                    this._set('validator', validator);
                    if (this._started){
                        this.validateNow();
                    }
                }));

                when(ValidatorFactory.create(value), function(validator){
                    validatorDeferred.resolve(validator);
                });
            },

            onBlur: function(){
                this.inherited(arguments);
                if (this._delayTimer) this.validateNow(); //Force immediate validation on blur, no need to wait for the delay timer.
            },

            _startValidateTimer: function(){

                //Delay timer. Don't validate every single value change
                clearTimeout(this._delayTimer);
                this._delayTimer = setTimeout(lang.hitch(this, function(){
                    this.validateNow();
                }), this.delay);
            },

            validateNow: function(){
                // Stop the delay timer and force an immediate validation
                clearTimeout(this._delayTimer);
                this._validate();
            },

            _validate: function(){
                if (this.suppressValidation){
                    return;
                }

                if (this.validator && this.validator.isValid){
                    var timestamp = new Date().getTime();
                    this._processValidationResult(this.validator.isValid(this.get('value')), timestamp);
                } else {
                    //no validator set, so process an empty result to clear any old messages or styles
                    this._processValidationResult(new Result({value: true, messages: []}), new Date().getTime());
                }
            },

            _processValidationResult: function(resultObject, timestamp){

                if (this._setValueTimestamp > timestamp){
                    // _validate has been called with a fresh value, so don't update the ui
                    return null;
                }

                var result = resultObject.get('value'),
                    state;

                switch (true){
                    case (result === true):
                        state = this._getChildrenState();
                        break;
                    case (result === false):
                        state = 'Error';
                        break;
                    case result.then:
                        result.then(lang.hitch(this, function(resultObject){
                            this._processValidationResult(resultObject, timestamp);
                        }));
                        state = 'Validating';
                        break;
                }

                this.set('state', state);
                this.set('validationMessages', resultObject.get('messages'));
                this.updateValidationStyle();
                return null;
            },

            _getChildrenState: function(){

                if ( ! this._descendants){
                    return '';
                }

                var states = array.map(this._descendants, function(widget){
                    return widget.get("state") || "";
                });

                if (array.indexOf(states, "Error") >= 0){
                    return 'Error';
                }
                if (array.indexOf(states, "Validating") >= 0){
                    return "Validating";
                }
                if (array.indexOf(states, 'Incomplete') >= 0){
                    return 'Incomplete';
                }

                if (array.filter(states, function(state){
                        return (state != '');
                    }).length > 0
                ){
                    return 'Invalid';
                }

                return '';
            },

            destroy: function(){
                clearTimeout(this._delayTimer);
                this.inherited(arguments);
            }
        }
    );
});
