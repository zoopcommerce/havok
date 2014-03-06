define([
    'dojo/Deferred',
    './parser',
    'dojo/domReady!'
],
function(
    Deferred,
    parser
){
    // module:
    //		havok/parser/complete

    var complete;

    return {
		// summary:
		//		An AMD plugin that returns when document parsing is complete.

        load: function(/*String?*/id, /*Function?*/require, /*Callback*/callback){
            if (!complete){
                complete = new Deferred;
                parser.parse().then(function(){
                    complete.resolve();
                })
            }
            complete.then(callback);
        }
    };
});
