define([
    './started!'
],
function(
    router
){
    // module:
    //		havok/router/baseUrl

    return {
        load: function(id, require, callback){
            callback(router.baseUrl);
        }
    };
});


