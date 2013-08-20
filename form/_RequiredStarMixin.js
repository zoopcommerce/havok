define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-attr'
],
function (
    declare,
    lang,
    query,
    domAttr
){
    return declare(
        [],
        {

            //Adds the supplied string as an appendage to the label if validator is the same as the requiredValidatorDef

            //When should the star be shown? Possible values:
            //    false: never show
            //    true: always show
            //    auto: only show if a required attr is set
            //requiredStar: 'auto',

            requiredStarTemplate: '<span class="text-warning"> *</span>',

            _setLabelAttr: function(value) {

                if (value){
                    value = value.replace(this.requiredStarTemplate, '');
                }

                if (this.requiredStar){
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

            buildRendering: function(){

                var nodeList,
                    required;

                if (this.srcNodeRef){
                    if (this.srcNodeRef.children.length > 0){
                        nodeList = query('INPUT[required]', this.srcNodeRef);
                        if (nodeList.length > 0){
                            required = true;
                        }
                    } else if (domAttr.has(this.srcNodeRef, 'required')){
                        required = true;
                    }
                }
                this.inherited(arguments);

                if (required){
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
