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

            require(['havok/proxy!./Handler'], lang.hitch(this, function(handlerProxy){
                handlerProxy.set('exception', this);
            }))
        },
        null,
        {
            //
            //severity: string
            //    One of the Exception.severities. Indicates how serious the exception is
            severity: severity.ERROR
        }
    )
});
