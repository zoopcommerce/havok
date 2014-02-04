define([
    'intern!object',
    'intern/chai!assert',
    'dojo/when',
    'havok/filter/Trim',
    'havok/filter/Uppercase',
    'havok/filter/Chain',
    'havok/filter/factory'
], function (registerSuite, assert, when, Trim, Uppercase, Chain, filterFactory) {
    registerSuite({
        name: 'havok/filter/factory',

        createWithExplicitBaseTest: function (){

            var deferred = this.async(5000);

            when(filterFactory.create({base: 'havok/filter/Trim'}), deferred.callback(function(filter){
                assert.isTrue(filter.isInstanceOf(Trim));
            }));
        },

        createWithImpliedBaseTest: function (){

            var deferred = this.async(5000);

            when(filterFactory.create('havok/filter/Trim'), deferred.callback(function(filter){
                assert.isTrue(filter.isInstanceOf(Trim));
            }));
        },

        createWithAbreviationTest: function (){

            var deferred = this.async(5000);

            when(filterFactory.create('Trim'), deferred.callback(function(filter){
                assert.isTrue(filter.isInstanceOf(Trim));
            }));
        },

        createChainTest: function (){

            var deferred = this.async(5000);

            when(filterFactory.create([{base: 'havok/filter/Trim'}, 'Uppercase']), deferred.callback(function(filter){
                assert.isTrue(filter.isInstanceOf(Chain));
                assert.isTrue(filter.filters[0].isInstanceOf(Trim));
                assert.isTrue(filter.filters[1].isInstanceOf(Uppercase));
            }));
        },

        createNestedChainTest: function (){

            var deferred = this.async(5000);

            when(filterFactory.create('Trim'), function(trimFilter){
                when(filterFactory.create(['Uppercase', trimFilter]), deferred.callback(function(filter){
                    assert.isTrue(filter.isInstanceOf(Chain));
                    assert.isTrue(filter.filters[0].isInstanceOf(Uppercase));
                    assert.isTrue(filter.filters[1].isInstanceOf(Trim));
                }))
            });
        }
    });
});
