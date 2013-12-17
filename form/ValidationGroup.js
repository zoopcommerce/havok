define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dijit/registry',
    '../widget/_WidgetBase',
    './_FormWidgetMixin',
    './_ValidationMixin',
    'dojo/text!./template/ValidationGroup.html'
],
function (
    declare,
    lang,
    array,
    registry,
    WidgetBase,
    FormWidgetMixin,
    ValidationMixin,
    template
){
    return declare(
        [WidgetBase, FormWidgetMixin, ValidationMixin],
        {

            validationStyle: {
                preActivity: {
                    //valid: [], //A list of classes to apply when valid
                    invalid: ['error'] //apply when invalid
                },
                postActivity: {
                    //valid: [], //apply when valid
                    invalid: ['error'] //apply when invalid
                }
            },

            // templateString: String
            templateString: template,

            startup: function(){

                this.form = registry.getEnclosingWidget(this.domNode.parentNode);

                this.inherited(arguments);

                var postActivity = lang.clone(this.fields);

                array.forEach(registry.findWidgets(this.form.domNode), lang.hitch(this, function(field){
                    if (this.fields.indexOf(field.name) != -1){
                        field.watch('postActivity', lang.hitch(this, function(property, oldValue, newValue){
                            postActivity[postActivity.indexOf(field.name)] = false;
                            if (array.filter(postActivity, function(value){return value}).length == 0){
                                this.set('postActivity', true);
                            }
                        }));
                        field.watch('value', lang.hitch(this, function(property, oldValue, newValue){
                            this._triggerValidate();
                        }));
                    }
                }));
            },

            _getValueAttr: function(){
                var value = {};
                array.forEach(registry.findWidgets(this.form.domNode), lang.hitch(this, function(field){
                    value[field.name] = field.get('value');
                }));
                return value;
            }
        }
    );
});
