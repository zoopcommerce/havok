define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'mystique/Required',
    'mystique/Chain'
],
function (
    declare,
    lang,
    Required,
    Chain
){
    return declare(
        [],
        {

            //Adds the supplied string as an appendage to the label if validator is the same as the requiredValidatorDef

            //When should the star be shown? Possible values:
            //    false: never show
            //    true: always show
            //    auto: only show if a required validator is set
            requiredStar: 'auto',

            requiredStarTemplate: '<span class="text-warning"> *</span>',

            _setLabelAttr: function(value) {

                var add,
                    i;

                if (this.requiredStar == 'auto'){
                    var validator = this.validator;
                    if (validator instanceof Required){
                        add = true;
                    } else if (validator instanceof Chain){
                        for (i = 0; i < validator.validators.length; i++){
                            if (validator.validators[i] instanceof Required){
                                add = true;
                                break;
                            }
                        }
                    }
                } else if (this.requiredStar){
                    add = true;
                }

                if (value){
                    value = value.replace(this.requiredStarTemplate, '');
                }

                if (add){
                    if (value){
                        value = value + this.requiredStarTemplate
                    } else {
                        value = this.requiredStarTemplate
                    }
                }

                if (value){
                    this.inherited(arguments, [value]);
                }
            },

            _getLabelAttr: function(){
                var value = this.label;
                if (value){
                    value = value.replace(this.requiredStarTemplate, '');
                }
                return value;
            },

            startup: function(){

                this.inherited(arguments);

                this.watch('validator', lang.hitch(this, function(prop, oldValue, newValue){
                    this.set('label', this.label);
                }));

                this.watch('requiredStar', lang.hitch(this, this.set('label', this.label)));
            }
        }
    );
});
