define([
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (
    declare,
    lang
){
    // module:
    //		havok/di/Proxy

    return declare
    (
        [],
        {
            // summary:
            //		A proxy to get or use an object.

            _identity: undefined,

            _di: undefined,

            constructor: function(identity, di){
                this._identity = identity;
                this._di = di;
            },

            diGet: function(){
                var object = this._di.get(this._identity);
                lang.mixin(this, object);
                return object;
            }
        }
    )
});


