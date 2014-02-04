define ([
    'dojo/_base/config',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    '../lang',
    '../is',
    './exception/notStatic'
],
function (
    dojoConfig,
    array,
    Deferred,
    DeferredList,
    lang,
    is,
    notStaticException
) {
    // module:
    //		havok/config/manager

    var merge = function(/*String[]?*/mergeConfigs, /*Object?*/target) {
        // summary:
        //		Merges multiple config modules
        // mergeConfigs:
        //      A list of module ids to load and merge.
        //      If null, the merge key of target will be used.
        // target:
        //      An object to merged the config objects into.
        //      If null, dojoConfig itself will be used.
        // returns: dojo/Deferred
        //      Will resolve when the merge is complete

        // Resolves when target has been merged
        var done = new Deferred;

        // Resolves when merge is complete
        var mergeDone = new Deferred;

        target = target || dojoConfig;
        mergeConfigs = mergeConfigs || target.merge;

        // Load required config modules
        if (mergeConfigs) {

            var loadConfigsDeferred = new DeferredList(array.map(mergeConfigs, function(configMid){
                return loadConfigModule(configMid);
            }));

            // Merge config modules
            loadConfigsDeferred.then(function(unmergedConfigs){
                mergeDone.resolve(doMerge(unmergedConfigs));
            });
        } else {
            mergeDone.resolve();
        }

        mergeDone.then(function(mergedConfig){
            target = lang.mixinDeep(target, mergedConfig);
            done.resolve(target);
        });

        return done;
    };

    function loadConfigModule(moduleName) {
        // summary:
        //		Load a single config module

        var deferredConfig = new Deferred();

        var resolveConfigModule = function(configModule){
            if (configModule.merge){
                merge(configModule.merge, configModule).then(function(configModule){
                    deferredConfig.resolve(configModule);
                });
            } else {
                deferredConfig.resolve(configModule);
            }
        };

        require([moduleName], function(configModule){
            resolveConfigModule(configModule);
        });

        return deferredConfig;
    }

    function doMerge(unmergedConfigs){
        // summary:
        //		Merge all the configs together

        var mergedConfig = {};

        for (var index in unmergedConfigs) {
            if (is.isStatic(unmergedConfigs[index][1])){
                mergedConfig = lang.mixinDeep(mergedConfig, unmergedConfigs[index][1]);
            } else {
                throw new notStaticException;
            }
        }
        return mergedConfig;
    }

    return {
        // summary:
        //		Allows the merging of multiple config objects into dojo config.

        merge: merge
    }
});