define([
    'require',
    'dojo/_base/lang',
    'dojo/errors/create',
    './severity'
],
function(
    require,
    lang,
    create,
    severity
){

	// module:
	//		havok/exception/Base

	return create(
        "Base",
        function(message, options){

            this.message = 'isBase!' + message;

            lang.mixin(this, options);

            require(['../get!./handler'], lang.hitch(this, function(handler){
                handler.handle(this);
            }))
        },
        null,
        {
            severity: severity.ERROR
        }
    )
});
