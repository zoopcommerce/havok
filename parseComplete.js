define([
        'dojo/parser',
        'dojo/domReady!'
    ],
    function(
        parser
    ){
        // module:
        //		havok/parseComplete
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
                    });
                }
            }
        };
    }
);


