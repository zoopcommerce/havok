define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/di/TestDi", require.toUrl("./TestDi.html"));
	}
});