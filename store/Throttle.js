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

    return function(store, throttle, ttl){

        //    A value in milliseconds
        //    The store will not be accessed at a rate faster than the set throttle interval.
        throttle = throttle || 100;

        //    The time in milliseconds that request to the store will wait in the queue before
        //    being dropped
        ttl = ttl || 500;

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

                        var time = (new Date).getTime(),
                            request;
                        while(queue.length > 0){
                            if (time > queue[0].expires) {
                                request = queue.shift();
                                request.done.reject('expired');
                            } else {
                                process();
                                break;
                            }
                        }
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
                        expires: (new Date).getTime() + ttl,
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
                        expires: (new Date).getTime() + ttl,
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
                        expires: (new Date).getTime() + ttl,
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
                        expires: (new Date).getTime() + ttl,
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
                        expires: (new Date).getTime() + ttl,
                        done: done
                    }

                queue.push(request);
                process();
                return done;
            }
        })
    }
});
