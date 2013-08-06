define(function() {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			var result = [bc.amdResources[bc.getSrcModuleInfo('havok/config/ready', referenceModule).mid]];

            // Load required config modules
            if (bc.merge) {
                var index;
                for (index in bc.merge) {
                    result.push(bc.amdResources[bc.getSrcModuleInfo(bc.merge[index], referenceModule).mid]);
                }
            }
            return result;
		}
	};
});
