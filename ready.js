define([
    'require',
    'dojo/_base/config',
    'dojo/Deferred',
    './array'
],
function(
    contextRequire,
    dojoConfig,
    Deferred,
    array
){
    // module:
    //		havok/ready

    var complete;

    return {
		// summary:
		//		An AMD plugin that bootstraps havok.
        // description:
        //      This AMP plugin will load any modules listed in the merged dojo config under the `deps` key.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if (!complete) {
                complete = new Deferred;
                var rootDeps = dojoConfig.deps.slice(0);
                contextRequire(['./config/ready!'], function(){
                    require(array.subtract(dojoConfig.deps, rootDeps), function(){
                        complete.resolve();
                    })
                })
            }
            complete.then(callback);
        }
    };
});
