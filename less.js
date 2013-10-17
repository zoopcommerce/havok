define([
    'dojo/_base/config',
    './config/ready!'
],
function(
    dojoConfig
){
    //This plugin is mostly empty so the dynamic less loading code isn't added to builds

    return {
        load: function(id, require, callback){

            //this is the callback executed by the plugin

            if (!dojoConfig.less) {
                //dynamic less loading is turnned off. Do nothing.
                callback();
                return;
            }

            require(['havok/lessLoader'], function(lessLoader){
                lessLoader.load(id, require, callback);
            })
        }
    };
});
