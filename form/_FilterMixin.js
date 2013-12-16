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
    // module:
    //    	havok/form/_FilterMixin

    return declare(
        [],
        {
            // summary:
            //      Applies filters to form input values

            /*=====
            // filter: String|String[]|Object|FilterBase
            filter: undefined,
            =====*/

            /*=====
            // _filterDeferred: Deferred
            _filterDeferred: undefined,
            =====*/

            buildRendering: function(){

                this.inherited(arguments);

                if (typeof this.filter == 'string' && (this.filter.substring(0,1) == '[' || this.filter.substring(0,1) == '{')) {
                    this.filter = JSON.parse(this.filter);
                }
            },

            _setFilterAttr: function(/*String|String[]|Object|FilterBase*/value){
                // summary:
                //     Will set the filter.

                // value:
                //     1. Name of a filter.
                //     2. Array of filter names. Will be passed to filterFactory.create()
                //     3. A filter definition. Will be passed to filterFactory.create()
                //     4. Instance of havok/filter/Base - the filter property is set equal to this instance.

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

            applyFilter: function(/*Mixed*/value){

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
