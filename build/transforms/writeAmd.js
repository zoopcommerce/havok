define([
    'build/transforms/writeAmd',
    './writeLess'
], function(writeAmd, writeLess){

    var write = function(
        resource,
        callback
    ){
        writeLess(resource, function(resource, err){
            if (writeAmd(resource, callback, err) == 0){
                callback(resource, err);
            }
        });
        return callback;
    };

    write.getLayerText = writeAmd.getLayerText;
    write.getDestFilename = writeAmd.getDestFilename;
    write.computeLayerContents = writeAmd.computeLayerContents;

    return write;
});
