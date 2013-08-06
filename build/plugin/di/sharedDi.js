define(function() {
	return {
	    start:function(
                mid,
                referenceModule,
                bc
            ){
	    return [
                bc.amdResources[bc.getSrcModuleInfo("havok/di/sharedDi", referenceModule).mid]
            ];
        }
    };
});
