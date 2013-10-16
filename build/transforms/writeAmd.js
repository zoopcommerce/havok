define([
    'build/transforms/writeAmd',
    './writeLess'
], function(writeAmd, writeLess){

    var write = function(
        resource,
        callback
    ){
        writeLess(resource, function(resource, err){
            writeAmd(resource, callback, err);
        });
        return callback;
    };

    write.getLayerText = writeAmd.getLayerText;
    write.getDestFilename = writeAmd.getDestFilename;
    write.computeLayerContents = writeAmd.computeLayerContents;

    return write;
});
