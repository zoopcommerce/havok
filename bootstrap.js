define([
    'dojo/_base/config',
    './config/ready!'
],
function(
    dojoConfig
){
    // module:
    //		havok/bootstrap

    var complete;

    return {
		// summary:
		//		An AMD plugin that bootstraps havok.
        // description:
        //      This AMP plugin will load any moduled listed in dojo config under the `bootstrap` key.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if (complete){
                callback();
            } else {
                require(dojoConfig.bootstrap, function(){
                    complete = true;
                    callback();
                })
            }
        }
    };
});
