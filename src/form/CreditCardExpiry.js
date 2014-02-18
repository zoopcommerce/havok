define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    './Form',
    '../widget/_WidgetsInTemplateMixin',
    './_FormWidgetMixin',
    './_ValidationMessagesMixin',
    './_ValidationStyleMixin',
    'dojo/text!./template/CreditCardExpiry.html',
    'mystique/CreditCardExpiry',
    './Select',
    './ValidationGroup'
],
function (
    declare,
    lang,
    string,
    Form,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    ValidationMessagesMixin,
    ValidationStyleMixin,
    template
){
    // module:
    //    	havok/form/_DropdownMixin

    return declare(
        [Form, WidgetsInTemplateMixin, FormWidgetMixin, ValidationStyleMixin, ValidationMessagesMixin],
        {
            // summary:
            //      Compisite form input for credit card expiry date

            // templateString: String
            templateString: template,

            buildRendering: function(){

                this.inherited(arguments);

                var i = new Date().getUTCFullYear(),
                    limit = i + 10;

                //Create years - 10 years from now
                for (i; i < limit; i++){
                    this.year.addItem(string.substitute(this.year.optionTemplate, {value: i, text: ('' + i).substr(2,2)}));
                }

                //Create months
                for (i = 1; i < 13; i++){
                    this.month.addItem(string.substitute(this.month.optionTemplate, {value: i < 10 ? '0' + i : '' + i, text: i}));
                }
            },

            startup: function(){

                this.inherited(arguments);

                this.validationGroup.watch('validationMessages', lang.hitch(this, function(prop, oldValue, newValue){
                    this.set('validationMessages', newValue);
                    this.updateValidationStyle();
                }));
            }
        }
    );
});
