var readProfile = require('./readProfile');
var writeProfile = require('./writeProfile');
var message = 'Merge configs into the defaultConfig';

mergeConfigs = function(profile, callback){

    console.log('BEGIN ' + message);

    require('./dojoConfig').setConfig(profile);
    require('dojo/dojo.js');

    // merge configs into the defaultConfig
    global.require(['dojo/_base/lang', 'dojo/Deferred', 'havok/config/manager'], function(lang, Deferred, configManager){

        var mergeDone = new Deferred;
        if (profile.defaultConfig && profile.defaultConfig.merge){
            var mergedConfig = {};
            configManager.merge(profile.defaultConfig.merge, mergedConfig).then(function(mergedConfig){
                profile.defaultConfig = lang.mixinDeep(profile.defaultConfig, mergedConfig);

                //make sure merged config files are left out from layers - they just waste space there
                var i;
                var j;
                var index;

                for (i in profile.layers){
                    for (j in profile.defaultConfig.merge){
                        index = profile.layers[i].include.indexOf(profile.defaultConfig.merge[j]);
                        if (index !== -1){
                            profile.layers[i].include.splice(index, 1);
                        }
                    }
                }
                delete(profile.defaultConfig.merge);
                mergeDone.resolve();
            });
        }

        mergeDone.then(
            function(){
                if (profile.defaultConfig && profile.defaultConfig.less){
                    //move less config so dynamic loading doesn't happen with a deployed layer
                    profile.less = profile.defaultConfig.less;
                    profile.defaultConfig.less = false;

                    var i;
                    var index;

                    for (i in profile.layers){
                        index = profile.layers[i].include.indexOf('havok/lessLoader');
                        if (index !== -1){
                            profile.layers[i].include.splice(index, 1);
                        }
                    }
                }
                console.log('DONE  ' + message);
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
