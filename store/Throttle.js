define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/store/util/QueryResults',
    'dojo/when'
],
function (
    lang,
    Deferred,
    QueryResults,
    when
){

    return function(store, throttle){

        throttle = throttle || 100;

        //      A value in milliseconds
        //      The store will not be accessed at a rate faster than the set throttle interval.

        var queue = [],
            timeout,
            process = function(){
                if (!timeout){
                    var request = queue.shift();
                    if (request.type == 'query'){
                        when(store.query(request.query, request.directives), function(data){
                            request.done.resolve(data);
                        })
                    } else if (request.type == 'get'){
                        when(store.get(request.id), function(data){
                            request.done.resolve(data);
                        })
                    } else if (request.type == 'put'){
                        when(store.put(request.object, request.directives), function(){
                            request.done.resolve();
                        })
                    } else if (request.type == 'add'){
                        when(store.add(request.object, request.directives), function(){
                            request.done.resolve();
                        })
                    } else if (request.type == 'remove'){
                        when(store.remove(request.id), function(){
                            request.done.resolve();
                        })
                    }
                    timeout = setTimeout(function(){
                        timeout = undefined;
                        if (queue.length > 0) process();
                    }, throttle)
                }
            };

        return lang.delegate(store, {

            query: function(query, directives){
                var done = new Deferred,
                    result = new QueryResults(done),
                    request = {
                        type: 'query',
                        query: query,
                        directives: directives,
                        done: done
                    }

                queue.push(request);
                process();
                return result;
            },

            get: function(id){
                var done = new Deferred,
                    request = {
                        type: 'get',
                        id: id,
                        done: done
                    }

                queue.push(request);
                process();
                return done;
            },

            put: function(object, directives){
                var done = new Deferred,
                    request = {
                        type: 'put',
                        object: object,
                        directives: directives,
                        done: done
                    }

                queue.push(request);
                process();
                return done;
            },

            add: function(object, directives){
                var done = new Deferred,
                    request = {
                        type: 'add',
                        object: object,
                        directives: directives,
                        done: done
                    }

                queue.push(request);
                process();
                return done;
            },

            remove: function(id){
                var done = new Deferred,
                    request = {
                        type: 'remove',
                        id: id,
                        done: done
                    }

                queue.push(request);
                process();
                return done;
            }
        })
    }
});
