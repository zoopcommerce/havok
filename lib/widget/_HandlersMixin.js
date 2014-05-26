define([
    'dojo/_base/declare',
    'dojo/_base/array'
],
function(
    declare,
    array
) {
    // module:
    //		havok/widget/_Handlers

    return declare(
        [],
        {
            constructor: function(){
                this.handlers = {};
            },

            hasHandlers: function(group){
                return !!this.handlers[group]
            },

            addHandler: function(handler, group){
                if (!group) group = 'default';
                if (!this.handlers[group]) this.handlers[group] = [];
                this.handlers[group].push(handler);
            },

            removeHandlers: function(group){
                if (group){
                    array.forEach(this.handlers[group], function(handler){
                        if (handler.remove) handler.remove();
                        else handler.unwatch();
                    })
                    delete(this.handlers[group])
                } else {
                    for(var i in this.handlers) this.removeHandlers(i)
                }
            },

            destroy: function(){
                this.removeHandlers();
                this.inherited(arguments);
            }
        }
    );
});
