define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("havok/test/filter/TestChain", require.toUrl("./TestChain.html"));
	}
});