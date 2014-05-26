define([
    'dojo/sniff'
],
function(
    sniff
) {
    // module:
    //		havok/cssfx

    return {
		// summary:
		//		Utility methods for working with css3 transitions

        transitionEndEvent: function(){
            // summary:
            //      returns the cross browser correct name for the css3 transition end event

            return sniff('webkit') ? 'webkitTransitionEnd' : 'transitionend';
        }
    };
});
