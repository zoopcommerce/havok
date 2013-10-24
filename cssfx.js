define([
    'dojo/sniff'
],
function(
    sniff
) {
    // Utility methods for working with css3 transitions
    //

    return {
        transitionEndEvent: function(){
            return sniff('webkit') ? 'webkitTransitionEnd' : 'transitionend';
        }
    };
});
