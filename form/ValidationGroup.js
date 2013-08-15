define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    '../widget/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    './_FormMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    'dojo/text!./template/ValidationGroup.html',
    '../widget/Alert'
],
function (
    declare,
    lang,
    array,
    WidgetBase,
    FormMixin,
    ValidationMixin,
    ValidationMessagesMixin,
    WidgetsInTemplateMixin,
    template
){
    return declare(
        [WidgetBase, WidgetsInTemplateMixin, FormMixin, ValidationMixin, ValidationMessagesMixin],
        {
            content: '',

            templateString: template,

            validationStyle: {
                preActivity: {
                    //valid: [], //A list of classes to apply when valid
                    //invalid: [] //apply when invalid
                },
                postActivity: {
                    //valid: [], //apply when valid
                    invalid: ['alert-error'] //apply when invalid
                }
            },

            startup: function(){
                this.inherited(arguments);

                array.forEach(this._getDescendantFormWidgets(), lang.hitch(this, function(child){
                    child.watch('postActivity', lang.hitch(this, '_childPostActivityWatcher'));
                }));

                this.watch('validationMessages', lang.hitch(this, function(property, oldValue, newValue){
                    if ((this.postActivity && this.suppressValidationMessages.postActivity) ||
                        (!this.postActivity && this.suppressValidationMessages.preActivity) ||
                        newValue.length == 0
                    ){
                        this.alert.hide();
                    } else {
                        this.alert.show();
                    }
                }));
            },

            _updateActivityFromState: function(property, oldValue, newValue){
            },

            _childPostActivityWatcher: function(property, oldValue, newValue){
                if (newValue){
                    this.set('postActivity', true);
                }
            },

            _getInvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this.get('state') != ''){
                    result.push(this);
                }
                return result;
            }
        }
    );
});
