define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './Form',
    'dijit/_WidgetsInTemplateMixin',
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
    Form,
    WidgetsInTemplateMixin,
    FormWidgetMixin,
    ValidationStyleMixin,
    ValidationMessagesMixin,
    template
){
    return declare(
        [Form, WidgetsInTemplateMixin, FormWidgetMixin, ValidationStyleMixin, ValidationMessagesMixin],
        {
            templateString: template,

            postCreate: function(){

                var i = new Date().getUTCFullYear(),
                    limit = i + 10,
                    years = [],
                    months = [];

                //Create years - 10 years from now
                for (i; i < limit; i++){
                    years.push({text: ('' + i).substr(2,2), id: i});
                }
                this.year.set('store', {data: years});

                //Create months
                for (i = 1; i < 13; i++){
                    months.push({text: i, id: i < 10 ? '0' + i : '' + i});
                }
                this.month.set('store', {data: months});

                this.inherited(arguments);
            },

            startup: function(){

                this.validationStyle = this.validationGroup.validationStyle;

                this.inherited(arguments);

                this.validationGroup.watch('validationMessages', lang.hitch(this, function(prop, oldValue, newValue){
                    this.set('validationMessages', newValue);
                    this.updateValidationStyle();
                }));
            }
        }
    );
});
