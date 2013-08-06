define(function() {

    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){

            var result = [bc.amdResources[bc.getSrcModuleInfo("havok/router/baseUrl", referenceModule).mid]];

            return result;
        }
    };
});


