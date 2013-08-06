define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/store/TestManager", require.toUrl("./TestManager.html"));
	}
});