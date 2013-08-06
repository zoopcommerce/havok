define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/di/TestGet", require.toUrl("./TestGet.html"));
	}
});