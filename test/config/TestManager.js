define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/config/TestManager", require.toUrl("./TestManager.html"));
	}
});


