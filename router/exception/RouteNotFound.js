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
    return create(
        "RouteNotFoundException",
        function(message, options){
            lang.mixin(this, options);
        },
        BaseException
    )
});
