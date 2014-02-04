define([
    'dojo/_base/lang',
    '../di/Di'
],
function(
    lang,
    Di
){

    var prefix = 'mystique/',
        base = function(abbreviation){
            return {base: prefix + abbreviation}
        }

    return {

        //di: undefined,

        diConfig: {
            'Alpha'            : base('Alpha'),
            'Boolean'          : base('Boolean'),
            'Chain'            : {
                base: 'mystique/Chain',
                directives: {
                    cache: false
                }
            },
            'CreditCard'       : base('CreditCard'),
            'CreditCardExpiry' : base('CreditCardExpiry'),
            'Currency'         : 'havok/validator/Currency',
            'Cvv'              : base('Cvv'),
            'Date'             : base('Date'),
            'Email'            : base('Email'),
            'Equal'            : base('Equal'),
            'GreaterThan'      : base('GreaterThan'),
            'GreaterThanEqual' : base('GreaterThanEqual'),
            'HexColor'         : base('HexColor'),
            'Identifier'       : base('Identifier'),
            'Int'              : base('Int'),
            'Length'           : base('Length'),
            'LessThan'         : base('LessThan'),
            'LessThanEqual'    : base('LessThanEqual'),
            'NotEqual'         : base('NotEqual'),
            'NotRequired'      : base('NotRequired'),
            'Password'         : base('Password'),
            'Required'         : base('Required'),
            'Slug'             : base('Slug'),
            'String'           : base('String'),
            'mystique/Chain'   : {
                directives: {
                    cache: false
                }
            }
        },

       create: function(config){

            if (lang.isArray(config)){
                config = {
                    base: 'Chain',
                    gets: {
                        validators: config
                    }
                };
            }

            return this._diGetter().get(config);
        },

        _diGetter: function(){
            if (!this.di){
                this.di = new Di(this.diConfig);
            }
            return this.di;
        }
    }
});
