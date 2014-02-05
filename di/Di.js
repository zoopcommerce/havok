define([
    'dojo/_base/declare',
    'dojo/_base/config',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dojo/when',
    '../lang',
    './Proxy'
],
function (
    declare,
    dojoConfig,
    Deferred,
    DeferredList,
    when,
    lang,
    Proxy
) {
    // module:
    //		havok/di/Di

    return declare(
        [],
        {
            // summary:
            //		An object used for dependency injection.
            //
            // description:
            //		The config property may be populated with a config object that
            //		defines what to inject.
            //

            /*=====
            // _cache: Array
            //      An array of all objects created through the Di. If an object is requested
            //      more than once, it is retrieved from this array
            _cache: undefined,
            =====*/

            /*=====
            // _config: Object
            //      The configuration object. Defines what to inject into objects
            _config: undefined,
            =====*/

            /*=====
            // fallback: havok/di/Di
            //      Array of di instances. If no config is found for an indentifier, the fallback di instance will be used.
            fallback: undefined,
            =====*/

            constructor: function(/*Object*/config){

                this._cache = [];

                // Default to dojo config object if no config object is supplied
                if (!config){
                    if (!dojoConfig.di) dojoConfig.di = {};
                    config = dojoConfig.di;
                }

                this._config = config;
            },

            _create: function(/*mixed*/identifier) {
                // summary:
                //     Used to create an object with the supplied identifier
                // tags:
                //     protected

                var config,
                    base,
                    defaultDirectives = {
                        declare: false,
                        cache: true,
                        clone: false
                    };

                switch (true){
                    case typeof(identifier) == 'string':
                        config = this.getIdentifierConfig(identifier);
                        if ( ! config){
                            config = {};
                        }

                        //Marshal directives
                        if ( ! config.directives){
                            config.directives = defaultDirectives;
                        } else {
                            config.directives = lang.mixin(defaultDirectives, config.directives);
                        }

                        //Check for explicit base
                        base = identifier;
                        if (config.base){
                            base = config.base;
                        }

                        break;
                    case typeof(identifier) == 'object':
                        config = lang.clone(identifier);

                        //Marshal directives
                        config.directives = defaultDirectives;
                        config.directives.cache = false; //Never cache nested configs

                        identifier = null;
                        base = config.base;
                        if (!base){
                            return null;
                        }
                        break;
                    default:
                        return null;
                }

                //Get the base object to inject
                var baseObjectDeferred = new Deferred;
                if (typeof(base) == 'object'){
                    //If base is an object, then inject that object
                    baseObjectDeferred.resolve(base);
                } else if (base != identifier && this.getIdentifierConfig(base)){
                    //If base is defined in the di config, then
                    //get that object
                    when(this._get(base), function(baseObject){
                        baseObjectDeferred.resolve(baseObject);
                    });
                } else if (this.fallback && this.fallback.getIdentifierConfig(base)){
                    when(this.fallback.get(base), function(baseObject){
                        baseObjectDeferred.resolve(baseObject);
                    })
                } else {
                    //Default is to load the AMD module
                    require([base], function(baseObject){
                        baseObjectDeferred.resolve(baseObject);
                    });
                }

                //Create object
                var deferredObject = new Deferred(),
                    index = this._cache.length;

                if (config.directives.cache){
                    this._cache[index] = {identifier: identifier, object: deferredObject};
                }

                baseObjectDeferred.then(lang.hitch(this, function(baseObject){

                    var object,
                        resolveObject = lang.hitch(this, function(object){
                            if (config.directives.cache){
                                this._cache[index].object = object;
                            }
                            deferredObject.resolve(object);
                        });

                    if (baseObject.prototype){ //check if we can create an instnace
                        if (config.directives.declare){
                            when(this._inject({}, config), lang.hitch(this, function(injectedObject){
                                object = declare(identifier, [baseObject], injectedObject);
                                resolveObject(object);
                            }));
                        } else {
                            object = new baseObject;
                            when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                                resolveObject(injectedObject);
                            }));
                        }
                    } else {
                        if (config.directives.clone){
                            object = lang.clone(baseObject); //Just clone the module
                        } else {
                            object = baseObject;
                        }

                        when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                            resolveObject(injectedObject);
                        }));
                    }
                }));

                return deferredObject;
            },

            _get: function(/*mixed*/ identifier){
                // summary:
                //     Used to get an object with the supplied identifier
                // tags:
                //     protected

                var result;

                switch (true){
                    case typeof(identifier) == 'string':
                        //If identifier is a string, just get the corresponding object

                        //check the cache first
                        result = this._getCached(identifier);
                        if ( ! result){
                            //No cache, so create object
                            result = this._create(identifier);
                        }
                        break;
                    case lang.isArray(identifier):
                        //If identifier is array, then get each identifier in the array, and
                        //return the array
                        var resultArray = lang.clone(identifier),
                            getArrayItem = lang.hitch(this, function(index){
                                var objectDeferred = new Deferred;
                                when(this._get(identifier[index]), function(object){
                                    resultArray[index] = object;
                                    objectDeferred.resolve();
                                });
                                return objectDeferred;
                            }),
                            objectDeferreds = [];

                        for (var index in identifier){
                            objectDeferreds.push(getArrayItem(index));
                        }

                        result = new Deferred;
                        var objectDeferredsList = new DeferredList(objectDeferreds);
                        objectDeferredsList.then(function(){
                            result.resolve(resultArray);
                        });

                        break;
                    case Boolean(identifier.base):
                        //If identifier is object with base, then it is a nested config
                        result = this._create(identifier);
                        break;
                    default:
                        //Don't know what to do with it, so just pass it back
                        result = identifier;
                }

                return result;
            },

            _proxy: function(/*String*/identifier){
                // summary:
                //     Used to get a proxy to the object with the supplied identifier.
                //     If a cache already exists, that will be returned instead of the
                //     proxy.
                // tags:
                //     protected

                var result;

                switch (true){
                    case typeof(identifier) == 'string' || Boolean(identifier.base):
                        result = this._createProxy(identifier);
                        break;
                    case lang.isArray(identifier):
                        result = []
                        for (var item in identifier){
                            result.push(this._proxy(identifier[item]));
                        }
                        break;
                    default:
                        //Don't know what to do with it, so just pass it back
                        result = identifier;
                }

                return result;
            },

            _createProxy: function(/*String*/identifier){

                //check to see if the object alredy exists in cache
                var object = this._getCached(identifier);
                if (object && ! object.then){
                    return object;
                }

                var config;
                if (identifier.base){
                    config = identifier;
                    identifier = identifier.base;
                } else {
                    config = this.getIdentifierConfig(identifier);
                }

                var proxy = new Proxy(identifier, this),
                    method;

                if (config && config.params){
                    //mixin any params
                    lang.mixin(proxy, config.params);
                }

                if (config && config.proxyMethods){
                    //hook up proxy methods
                    for (var index in config.proxyMethods){
                        method = config.proxyMethods[index];
                        proxy[method] = this._proxyMethod(method);
                    }
                }

                return proxy;
            },

            _proxyMethod: function(/*String*/method){
                return function(){
                    var proxyArguments = arguments,
                        resultDeferred = new Deferred;

                    when(this._di.get(this._identity), function(object){
                        when(object[method].apply(object, proxyArguments), function(result){
                            resultDeferred.resolve(result);
                        })
                    });
                    return resultDeferred;
                }
            },

            _getCached: function(/*String*/identifier){
                // summary:
                //     Will return an instance of object with the supplied identifier
                //     if it already exists. If not, will return null.
                // tags:
                //     protected

                var index;

                //Check for already created instance
                for(index in this._cache){
                    if (this._cache[index].identifier == identifier){
                        return this._cache[index].object;
                    }
                }

                return null;
            },

            _inject: function(/*Object*/object, /*Object */config){
                // summary:
                //     Used to inject an object with the objects defined in the
                //     supplied config
                //
                // tags:
                //     protected

                //return early if there are no injections to do
                if ( ! config){
                    return object;
                }

                var attr;

                //Inject prarams
                lang.mixin(object, config.params);

                //Inject gets
                var i,
                injectGet = lang.hitch(this, function(getIdentifier, attrGet){
                    var getDeferred = new Deferred;
                    when(this._get(getIdentifier), function(injectionObject){
                        if (lang.isArray(injectionObject) && lang.isArray(object[attrGet])){
                            for (i = 0; i < injectionObject.length; i++){
                                object[attrGet].push(injectionObject[i]);
                            }
                        } else {
                            object[attrGet] = injectionObject;
                        }
                        getDeferred.resolve();
                    });
                    return getDeferred;
                });
                var getsDeferreds = [];
                for (attr in config.gets){
                    getsDeferreds.push(injectGet(config.gets[attr], attr));
                }

                //Inject proxies
                var injectionProxy;
                for (attr in config.proxies){
                    injectionProxy = this._proxy(config.proxies[attr]);
                    if (lang.isArray(injectionProxy) && lang.isArray(object[attr])){
                        for (i = 0; i < injectionProxy.length; i++){
                            object[attr].push(injectionProxy[i]);
                        }
                    } else {
                        object[attr] = injectionProxy;
                    }
                }

                if (getsDeferreds.length > 0){

                    var deferredObject = new Deferred(),
                        getsDeferredsList = new DeferredList(getsDeferreds);

                    getsDeferredsList.then(function(){
                        deferredObject.resolve(object);
                    })
                    return deferredObject;
                } else {
                    return object;
                }

                return deferredObject;
            },

            clearCache: function(){
                // summary:
                //     Empties the cache

                this._cache = [];
            },

            mergeConfig: function(/*Object*/merge){
                // summary:
                //     Merge a config object with the existing config object.

                this._config = lang.mixinDeep(this._config, merge);
            },

            getConfig: function(){
                // summary:
                //     Return the complete config object

                return this._config;
            },

            setConfig: function(/*Object*/ config){
                this._config = config;
            },

            setIdentifierConfig: function(/*String*/ identifier, /*Object*/ config) {
                // summary:
                //     Set the config object for a particular identifier

                this._config[identifier] = config;
            },

            getIdentifierConfig: function(/*String*/identifier){
                // summary:
                //     Return the config object for a particular identifier

                for(var alias in this._config){
                    if (alias == identifier){
                        return this._config[alias];
                    }
                }
                return null;
            },


            get: function(/*String*/identifier){
                // summary:
                //     Return a deferred that will resolve to the identifier requested.
                //     Will return cached object if one exists.

                return this._get(identifier);
            },

            proxy: function(/*String*/identifier){
                // summary:
                //     Return a Proxy object that will proxy the identifier requested.

                return this._proxy(identifier)
            },

            inject: function(/*Object*/object, /*String*/identifier){
                // summary:
                //     Use inject to inject an object created outside the di
                //     with the di config

                var config = this.getIdentifierConfig(identifier);
                if (config){
                    object = this._inject(object, config);
                }
                return object;
            }
        }
    );
});
