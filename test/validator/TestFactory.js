define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/validator/TestFactory", require.toUrl("./TestFactory.html"));
	}
});