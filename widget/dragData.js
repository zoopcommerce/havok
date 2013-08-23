define(
    [],
    function(){
        //this is a hack because dataTransfer.getData() always returns a null in chrome in a dragover event
        //therefore, this is effectively a global variable that is the drag data store.
        return {}
    }
);
