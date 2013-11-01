define([
    'dojo/_base/config',
    './config/ready!'
],
function(
    dojoConfig
){
    // module:
    //		havok/bootstrap
    //

    var complete;

    return {
        load: function(id, require, callback){
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
