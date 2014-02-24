define(function() {
    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){
            return bc.amdResources[bc.getSrcModuleInfo('havok/parser/complete', referenceModule).mid];
        }
    };
});
