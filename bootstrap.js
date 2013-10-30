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

    return {
        load: function(id, require, callback){
            require(dojoConfig.bootstrap, function(){
                callback()
            })
        }
    };
});
