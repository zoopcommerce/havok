define([
    'dojo/errors/create',
    'dojo/i18n!../../nls/config',
    '../../exception/Base'
],
function(create, configMessages, Base){

	// module:
	//		havok/config/exception/notStatic

	/*=====
	 return function(){
		 // summary:
		 //		Returns an exception that indicates a config object has a non-static member
         // description:
         //     Non-static members, such as a function, are not permitted in config objects.
         //     This restriction enabled config merging to be pre-computed during a build
         //     for faster more performant production deployments.
	 };
	 =====*/

	return create("notStatic", null, Base, {
		message: configMessages.notStatic,
        consoleLog: true
	});
});
