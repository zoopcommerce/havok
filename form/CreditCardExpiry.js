define([
    'dojo/_base/declare',
    './ValidationGroup',
    './_FormWidgetMixin',
    'dojo/text!./template/CreditCardExpiry.html',
    'mystique/CreditCardExpiry',
    './Select'
],
function (
    declare,
    ValidationGroup,
    FormWidgetMixin,
    template
){
    return declare(
        [ValidationGroup, FormWidgetMixin],
        {
            templateString: template,

            validator: 'CreditCardExpiry',

            label: 'Card Expiry',

            postCreate: function(){

                var i = new Date().getUTCFullYear(),
                    thisyear = i,
                    thismonth = new Date().getMonth() + 1,
                    limit = i + 10,
                    years = [],
                    months = [];

                //Create years - 10 years from now
                for (i; i < limit; i++){
                    years.push({text: i, id: ('' + i).substr(2,2)});
                }
                this.year.set('store', {data: years});

                //Create months
                for (i = 1; i < 13; i++){
                    months.push({text: i, id: i < 10 ? '0' + i : '' + i});
                }
                this.month.set('store', {data: months});

                this.inherited(arguments);
            }
        }
    );
});
