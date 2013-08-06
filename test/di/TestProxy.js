define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/di/TestProxy", require.toUrl("./TestProxy.html"));
	}
});