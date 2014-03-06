define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/xhr',
    'dojo/DeferredList',
    'dojo/Evented',
    'dojo/store/JsonRest'
],
function(
    declare,
    lang,
    xhr,
    DeferredList,
    Evented,
    JsonRest
){

    // module:
    //		havok/store/JsonRest

    return declare (
        [JsonRest],
        {
            // summary:
            //      Tweaked version of dojo/store/JsonRest
            // description:
            //      Modifies request headers so the store plays more nicely json data

            '-chains-': {
                //Turn off constructor chaining so headers don't get wiped
                constructor: "manual"
            },

            // headers: Object
            //		Additional headers to pass in all requests to the server. These can be overridden
            //		by passing additional headers to calls to the store.
            headers: {
                Accept: 'application/json'
            },

            constructor: function(/*Object?*/options){
                // summary:
                //		This is a basic store for RESTful communicating with a server through JSON
                //		formatted data.
                // options:
                //		This provides any configuration information that will be mixed into the store
                declare.safeMixin(this, options);
            },

            remove: function(/*String*/id, /*Object?*/options){
                // summary:
                //		Deletes an object by its identity. This will trigger a DELETE request to the server.
                // id:
                //		The identity to use to delete the object
                // options:
                //		HTTP headers.
                options = options || {};

                if (this.transactionActive){
                    this.operations[id] = {action: 'remove', options: options};
                    this._transactionObj.emit('remove', {id: id, options: options});
                } else {
                    return xhr("DELETE", {
                        url: this.target + id,
                        handleAs: "json",
                        headers: lang.mixin({}, this.headers, options.headers)
                    });
                }
            },

            put: function(object, options){
                if (this.transactionActive){
                    this.operations[object[this.idProperty]] = {action: 'put', object: object, options: options};
                    this._transactionObj.emit('put', {object: object, options: options});
                } else {
                    return this.inherited(arguments);
                }
            },

            transaction: function(){
                //Note: need to make transactions smarter to use batch requests, patch, and list operations

                this.operations = {};
                this.transactionActive = true;

                this._transactionObj = new (declare([Evented], {
                    commit: lang.hitch(this, function(){
                        var i,
                            operation,
                            defList = [];

                        delete(this.transactionActive);

                        for(i in this.operations){
                            operation = this.operations[i];
                            if (operation.action == 'put'){
                                defList.push(this.put(operation.object, operation.options));
                            } else if (operation.action == 'remove'){
                                defList.push(this.remove(i, operation.options));
                            }
                        }

                        delete(this.operations);
                        return new DeferredList(defList);
                    }),
                    abort: lang.hitch(this, function(){
                        delete(this.operations);
                        delete(this.transactionActive);
                    })
                }))

                return this._transactionObj;
            }
        }
    );
});