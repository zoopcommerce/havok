define([
        './parser'
    ],
    function(
        parser
    ){
        // module:
        //		havok/complete
        //

        var complete;

        return {
            load: function(id, require, callback){
                if (complete){
                    callback();
                } else {
                    parser.parse().then(function(){
                        complete = true;
                        callback();
                    })
                }
            }
        };
    }
);
