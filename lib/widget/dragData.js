define(
    [],
    function(){
        // module:
        //		havok/widget/dragData

        //this is a hack because dataTransfer.getData() always returns a null in chrome in a dragover event
        //therefore, this is effectively a global variable that is the drag data store.
        return {
            // summary:
            //		Hack to overcome dataTransfer.getData() in chrome
            // description:
            //      dataTransfer.getData() always returns a null in chrome in a dragover event
            //      therefore, this is effectively a global variable that is the drag data store.
            //      Use `dragData` along with the `di` container like this: `require(['get!./dragData'], function(dragData){})`
        }
    }
);
