define([
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'dojo/store/util/QueryResults',
    'dojo/store/Cache'
],
function(
    lang,
    when,
    Deferred,
    QueryResults,
    Cache
){

    return function(masterStore, cachingStore, options){

        options = options || {};

        var queryCache = {},
            innerStore = Cache(masterStore, cachingStore, options);

        return lang.delegate(innerStore, {

            masterStore: masterStore,

            cachingStore: cachingStore,

            queryCache: {},

            clearQueryCacheMode: options.clearQueryCacheMode || 'auto', //auto|manual

            ttl: options.ttl || 1000 * 60 * 5, //default ttl five minutes

            clearQueryCache: function(){
                queryCache = {};
            },

            query: function(query, directives){
                directives = directives || {};
                var queryString = {},
                    idOnly = true,
                    idQuery,
                    done,
                    i;

                for (i in query){
                    if (typeof query[i] == 'function'){
                        idOnly = false;
                        queryString = undefined;
                        break;
                    } else if (query[i] instanceof RegExp){
                        idOnly = false;
                        queryString[i] = {'$regex': query[i].toString()}
                    } else if (i == innerStore.idProperty){
                        idQuery = true;
                        queryString[i] = query[i];
                    } else {
                        idOnly = false;
                        queryString[i] = query[i];
                    }
                }
                if (queryString) queryString = JSON.stringify(queryString);

                if (!queryString || !queryCache[queryString] || queryCache[queryString].expires < (new Date)){
                    //new query, not in cache
                    var expires = new Date;

                    done = new Deferred;
                    queryCache[queryString] = {
                        expires: expires.setMilliseconds(expires.getMilliseconds() + directives.ttl ? directives.ttl : this.ttl),
                        result: new QueryResults(done)
                    };

                    if (idOnly && idQuery){
                        when(innerStore.get(query[innerStore.idProperty]), lang.hitch(this, function(data){
                            done.resolve([data]);
                        }))
                    } else {
                        var innerResult = innerStore.query(query, directives);
                        when(innerResult, lang.hitch(this, function(data){
                            done.resolve(data);
                        }));
                    }
                    return queryCache[queryString].result;
                }

                //return query from cache
                done = new Deferred;
                queryCache[queryString].result.then(function(data){
                    done.resolve(data.slice(0)); //use a clone of the array, otherwise if the store is wrapped in Observable it won't work
                })
                return new QueryResults(done);
            },

            add: function(object, directives){
                if (this.clearQueryCacheMode == 'auto') this.clearQueryCache()
                return innerStore.add(object, directives);
            },

            put: function(object, directives){
                if (this.clearQueryCacheMode == 'auto') this.clearQueryCache()
                return innerStore.put(object, directives);
            },

            remove: function(id, directives){
                if (this.clearQueryCacheMode == 'auto') this.clearQueryCache()
                return innerStore.remove(id, directives);
            },

            evict: function(id){
                if (this.clearQueryCacheMode == 'auto') this.clearQueryCache()
                return innerStore.evict(id);
            }
        })
    }
})



