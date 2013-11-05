define([
        'dojo/Deferred',
        './parser'
    ],
    function(
        Deferred,
        parser
    ){
        // module:
        //		havok/complete
        //

        var complete;

        return {
            load: function(id, require, callback){
                if (!complete){
                    complete = new Deferred;
                    parser.parse().then(function(){
                        complete.resolve();
                    })
                }
                complete.then(callback);
            }
        };
    }
);
