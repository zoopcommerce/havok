define([
    'dojo/when',
    './manager'
],
function(
    when,
    manager
){
    // An AMD plugin that will wait until merged config is created

    return {
        load: function(id, require, callback){
            when(manager.merge(), function(){
                callback();
            });
        }
    };
});
