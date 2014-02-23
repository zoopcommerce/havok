require('../nodeconfig');
require('dojo/dojo.js');

var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');

mergeConfigs = function(profile, callback){
    // merge configs into the defaultConfig
    global.require(['dojo/_base/lang', 'dojo/Deferred', 'havok/config/manager'], function(lang, Deferred, configManager){

        var mergeDone = new Deferred;
        if (profile.defaultConfig && profile.defaultConfig.merge){
            var mergedConfig = {};
            configManager.merge(profile.defaultConfig.merge, mergedConfig).then(function(mergedConfig){
                profile.defaultConfig = lang.mixinDeep(profile.defaultConfig, mergedConfig);

                delete(profile.defaultConfig.merge);
                mergeDone.resolve();
            });
        }

        mergeDone.then(
            function(){
                if (profile.defaultConfig && profile.defaultConfig.less){
                    //move less config so dynamic loading doesn't happend with a deployed layer
                    profile.less = profile.defaultConfig.less;
                    delete(profile.defaultConfig.less);
                }
                callback(null, profile);
            },
            function(err){
                callback(err);
            }
        )
    })
}

if(require.main === module) {
    readProfile.readProfile(process.argv[2], function(err, profile){
        if (err) throw err;
        mergeConfigs(profile, function(err, profile){
            if (err) throw err;
            profile.selfPath = profile.selfPath.slice(0, -2) + 'processed.js';
            writeProfile.writeProfile(profile, function(){})
        });
    })
} else {
    exports.process = mergeConfigs
}
