define([
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (
    declare,
    lang
){
    // module:
    //    	havok/form/_RequiredStarMixin

    return declare(
        [],
        {
            // summary:
            //      A mixin that facilities marking form inputs as required.
            // description:
            //      Adds the supplied template as an appendage to the label if validator is the same as the requiredValidatorDef

            /*=====
            // requiredStar: Boolean
            //      When should the star be shown?
            requiredStar: undefined,
            =====*/

            // requiredStarTemplate: String
            requiredStarTemplate: '<span class="text-warning"> *</span>',

            _setLabelAttr: function(/*String*/value) {

                if (value) value = value.replace(this.requiredStarTemplate, '');

                if (this.requiredStar){
                    if (value){
                        value = value + this.requiredStarTemplate
                    } else {
                        value = this.requiredStarTemplate
                    }
                }

                if (value) this.inherited(arguments, [value]);
            },

            _getLabelAttr: function(){
                var value = this.label;
                if (value){
                    value = value.replace(this.requiredStarTemplate, '');
                }
                return value;
            },

            buildRendering: function(){

                var required;

                if (this.srcNodeRef &&
                    (this.srcNodeRef.hasAttribute('required') ||
                    this.srcNodeRef.querySelector('INPUT[required]'))
                ){
                    required = true;
                }
                this.inherited(arguments);

                if (required && typeof this.required == 'undefined'){
                    this.set('requiredStar', true);
                }
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
