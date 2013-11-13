define([
    'dojo/_base/lang',
    'dojo/errors/create',
    '../../exception/Base'
],
function(
    lang,
    create,
    BaseException
){
	// module:
	//		havok/router/exception/RouteNotFound

	/*=====
	 return function(){
		 // summary:
		 //		Returns an exception that indicates the router could not resolve a route
	 };
	 =====*/

    return create(
        "RouteNotFoundException",
        function(message, options){
            lang.mixin(this, options);
        },
        BaseException
    )
});
