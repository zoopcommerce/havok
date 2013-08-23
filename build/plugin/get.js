define(['havok/build/plugin/extractDepsFromDiConfig'], function(extractDepsFromDiConfig) {

    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){

            var result = [bc.amdResources['havok/get']],
				identifier = referenceModule ? bc.getSrcModuleInfo(mid, referenceModule).mid : mid;
			
            // Gather required mids from di config
            if (bc.defaultConfig.di && bc.defaultConfig.di[identifier]) {
                result = result.concat(extractDepsFromDiConfig(identifier));
            } else {
				result.push(bc.amdResources[identifier]);
			}

            return result;
        }
    };
});
