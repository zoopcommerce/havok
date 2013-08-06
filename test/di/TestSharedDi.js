define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/di/TestSharedDi", require.toUrl("./TestSharedDi.html"));
	}
});