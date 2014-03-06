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

    return declare(
        [],
        {
            // summary:
            //		A proxy to an object managed by a Di container.

            /*=====
            // _identity: String
            //      The identity used to get the object from the Di container.
            _identity: undefined,
            =====*/

            /*=====
            // _di: havok/di/Di
            //      The Di container.
            _di: undefined,
            =====*/

            constructor: function(/*String*/identity, /*havok/di/Di*/di){
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


