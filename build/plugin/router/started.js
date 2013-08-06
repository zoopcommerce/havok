define(function() {

	return {
		start:function(
			mid,
			referenceModule,
			bc
		){

			var result = [bc.amdResources[bc.getSrcModuleInfo("havok/router/started", referenceModule).mid]];

            return result;
		}
	};
});
