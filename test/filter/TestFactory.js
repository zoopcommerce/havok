define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/filter/TestFactory", require.toUrl("./TestFactory.html"));
	}
});