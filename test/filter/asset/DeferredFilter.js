define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'havok/filter/Base',
],
function(
    declare,
    lang,
    Deferred,
    Base
){
    // module:
    //		havok/test/filter/Asset/DeferredFilter

    return declare(
        [Base],
        {

            filter: function(value){

                var resultDeferred = new Deferred;

                // Delay the filter result to simulate server response time
                setTimeout(lang.hitch(this, function(){
                    resultDeferred.resolve('processed' + value);
                }), this.timeout);

                return resultDeferred;
            }
        }
    );
});
