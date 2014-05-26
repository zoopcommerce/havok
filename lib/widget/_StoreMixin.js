define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../store/_StoreMixin'
],
function (
    declare,
    lang,
    StoreMixin
){

    return declare(
        [StoreMixin],
        {
            _getStoreAttr: function(){
                return this._storeGetter();
            },

            _setQueryAttr: function(value){
                this._set('query', this._decodeQuery(value));
            },

            _getQueryAttr: function(){
                return lang.mixin({parent: undefined}, this.query);
            },

            _getQueryResultAttr: function(){
                return this._queryResultGetter();
            }
        }
    );
});
