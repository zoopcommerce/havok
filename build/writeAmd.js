define([
    "build/transforms/writeAmd",
    "./writeLess"
], function(writeAmd, writeLess){

   var write = function(
			resource,
			callback
		){
            var result = writeAmd(resource, function(resource, err){
                writeLess(resource, callback, err);
            });
			if (result == 0){
				writeLess(resource, callback);
			}
            return callback;
		};

		write.getLayerText = writeAmd.getLayerText;
		write.getDestFilename = writeAmd.getDestFilename;
		write.computeLayerContents = writeAmd.computeLayerContents;

		return write;
});

