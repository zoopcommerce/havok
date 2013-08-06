define([
    'dojo/errors/create',
    'dojo/i18n!../../nls/config',
    '../../exception/Base'
],
function(create, configMessages, Base){

	// module:
	//		havok/config/exception/notStatic

	return create("notStatic", null, Base, {
		message: configMessages.notStatic,
        consoleLog: true
	});
});
