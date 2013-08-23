define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    '../get!../filter/factory',
    '../filter/Base'
],
function (
    declare,
    lang,
    when,
    Deferred,
    FilterFactory,
    FilterBase
){

    return declare(
        [],
        {
            // filter: an instance of havok/filter/Base.
            //filter: undefined,

            //_filterDeferred: undefined,

            _setFilterAttr: function(value){
                // summary:
                //     Will set the filter. The value must be an instance of Base parameter may be one of three
                //     types:
                //
                //     Instance of Base - the filter property is set equal to this instance.
                //
                //     Array - if an array, it is assumed to be an array of filters, or filter definitions.
                //     The array will be passed to filterFactory.create(). The validator property
                //     will be set to the returned instance of FilterGroup
                //
                //     Object - an an object, it is assumbed to be a filter definition.
                //     The definition will be passed to filterFactory.create(). The filter property
                //     will be set to the returned instance of BaseValdiator
                //

                if ( ! value){
                    this._set('filter', value);
                    return;
                }

                if (!this._filterDeferred){
                    this._filterDeferred = new Deferred;
                }
                this._filterDeferred.then(lang.hitch(this, function(filter){
                    this._set('filter', filter);
                }));

                when(FilterFactory.create(value), lang.hitch(this, function(filter){
                    this._filterDeferred.resolve(filter);
                }));
            },

            applyFilter: function(value){

                if (!this.filter){
                    //no filter set, no filtering to be done
                    return value;
                }

                if (this.filter.isInstanceOf && this.filter.isInstanceOf(FilterBase)){
                    //filter set, so do filtering
                    return this.filter.filter(value);
                }

                //filter is a configuration string, but hasn't been created yet
                var filteredValueDeferred = new Deferred;

                if (!this._filterDeferred){
                    this._filterDeferred = new Deferred;
                }
                this._filterDeferred.then(function(filter){
                    filteredValueDeferred.resolve(filter.filter(value));
                });

                return filteredValueDeferred;
            }
        }
    );
});
