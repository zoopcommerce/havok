define([
    'intern!object',
    'intern/chai!assert',
    'dojo/when',
    'mystique/Length',
    'mystique/Alpha',
    'mystique/Slug',
    'mystique/Chain',
    'havok/validator/factory'
], function (registerSuite, assert, when, Length, Alpha, Slug, Chain, validatorFactory) {
    registerSuite({
        name: 'havok/validator/factory',

        createWithParamsTest: function (){

            var deferred = this.async(5000);

            when(validatorFactory.create({base: 'mystique/Length', params: {min: 5, max: 10}}), deferred.callback(function(validator){
                assert.isTrue(validator instanceof Length);
                assert.equal(5, validator.min);
                assert.equal(10, validator.max);
            }));
        },

        createWithImpliedBaseTest: function (){

            var deferred = this.async(5000);

            when(validatorFactory.create('mystique/Alpha'), deferred.callback(function(validator){
                assert.isTrue(validator instanceof Alpha);
            }));
        },

        createWithAbreviationTest: function (){

            var deferred = this.async(5000);

            when(validatorFactory.create('Alpha'), deferred.callback(function(validator){
                assert.isTrue(validator instanceof Alpha);
            }));
        },

        createChainTest: function (){

            var deferred = this.async(5000);

            when(validatorFactory.create([{base: 'Length', params: {min: 2, max: 8}},'Slug']), deferred.callback(function(validator){
                assert.isTrue(validator instanceof Chain);
                assert.isTrue(validator.validators[0] instanceof Length);
                assert.equal(2, validator.validators[0].min);
                assert.equal(8, validator.validators[0].max);
                assert.isTrue(validator.validators[1] instanceof Slug);
            }));
        },

        createNestedChainTest: function (){

            var deferred = this.async(5000);

            when(validatorFactory.create('Alpha'), function(alphaValidator){
                when(validatorFactory.create(['Slug', alphaValidator]), deferred.callback(function(validator){
                    assert.isTrue(validator instanceof Chain);
                    assert.isTrue(validator.validators[0] instanceof Slug);
                    assert.isTrue(validator.validators[1] instanceof Alpha);
                }))
            });
        }
    });
});
