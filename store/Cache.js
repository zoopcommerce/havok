define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred'
],
function(
    declare,
    lang,
    when,
    Deferred
){
    return declare([], {

        //masterStore: undefined,

        //cachingStore: undefined,

        //queryCache: undefined,

        constructor: function(masterStore, cachingStore, options){
            // masterStore:
            //		This is the authoritative store, all uncached requests or non-safe requests will
            //		be made against this store.
            // cachingStore:
            //		This is the caching store that will be used to store responses for quick access.
            //		Typically this should be a local store.
            // options: __CacheArgs?
            //		These are additional options for how caching is handled.

            this.masterStore = masterStore;
            this.cachingStore = cachingStore;
            this.options = options || {};
            this.options.ttl = this.options.ttl || 1000 * 60 * 5; //default ttl five minutes
            this.queryCache = {};
        },

        clearQueryCache: function(){
            this.queryCache = {};
        },

		query: function(query, directives){
            directives = directives || {};
            var queryString = {},
                i;

            for (i in query){
                if (typeof query[i] == 'function'){
                    queryString = undefined;
                    break;
                } else if (query[i] instanceof RegExp){
                    queryString[i] = {'$regex': query[i].toString()}
                } else {
                    queryString[i] = query[i];
                }
            }
            if (queryString) queryString = JSON.stringify(queryString);

            if (!queryString || !this.queryCache[queryString] || this.queryCache[queryString].expires < (new Date)){
                var expires = new Date;
                this.queryCache[queryString] = {
                    expires: expires.setMilliseconds(expires.getMilliseconds() + directives.ttl ? directives.ttl : this.options.ttl),
                    done: new Deferred
                };
                var results = this.masterStore.query(query, directives);
                results.forEach(lang.hitch(this, function(object){
                    if(!this.options.isLoaded || this.options.isLoaded(object)){
                        this.cachingStore.put(object);
                    }
                }));
                when(results, lang.hitch(this, function(resolvedResults){
                    this.queryCache[queryString].done.resolve(resolvedResults);
                    this.queryCache.done = true;
                }));
                return results;
            } else if (this.queryCache[queryString].done === true){
                return this.cachingStore.query(query, directives);
            } else {
                return this.queryCache[queryString].done;
            }
		},

		get: function(id, directives){
			return when(this.cachingStore.get(id), lang.hitch(this, function(result){
				return result || when(this.masterStore.get(id, directives), lang.hitch(this, function(result){
					if(result){
						this.cachingStore.put(result, {id: id});
					}
					return result;
				}))
			}))
		},

		add: function(object, directives){
            this.clearQueryCache();
			return when(this.masterStore.add(object, directives), lang.hitch(this, function(result){
				// now put result in cache
				this.cachingStore.add(object && typeof result == "object" ? result : object, directives);
				return result; // the result from the add should be dictated by the masterStore and be unaffected by the cachingStore
			}));
		},

		put: function(object, directives){
            this.clearQueryCache();
			// first remove from the cache, so it is empty until we get a response from the master store
			this.cachingStore.remove((directives && directives.id) || this.masterStore.getIdentity(object));
			return when(this.masterStore.put(object, directives), lang.hitch(this, function(result){
				// now put result in cache
				this.cachingStore.put(object && typeof result == "object" ? result : object, directives);
				return result; // the result from the put should be dictated by the masterStore and be unaffected by the cachingStore
			}));
		},
		remove: function(id, directives){
            this.clearQueryCache();
			return when(this.masterStore.remove(id, directives), lang.hitch(this, function(){
				return this.cachingStore.remove(id, directives);
			}));
		},
		evict: function(id){
            this.clearQueryCache();
			return this.cachingStore.remove(id);
		}
    })
})
