define(['havok/build/plugin/extractMidsFromConfig'], function(extractMidsFromConfig) {

    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){

            var result = [bc.amdResources[bc.getSrcModuleInfo("havok/get", referenceModule).mid]];

            // Gather required mids from di config
            if (bc.defaultConfig.di && bc.defaultConfig.di[mid]) {
                result = result.concat(extractMidsFromConfig(mid, referenceModule, bc));
            }

            return result;
        }
    };
});
