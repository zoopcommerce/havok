define(
    [],
    function(){
        return {
            di: {

                //
                //The default directives are:
                //directives: {
                //    declare: false,
                //    cache: true
                //}

                //Get instance with no base set.
                //When no base is set, the base is assumed to be the config property name
                //This will return an instnace of havok/test/di/asset/Penguin
                'havok/test/di/asset/Penguin': {
                    params: {
                        name: 'kate'
                    }
                },

                //Create with base set:
                //This will return an instnace of havok/test/di/asset/Zoo
                'zooWithBase': {
                    base: 'havok/test/di/asset/Zoo'
                },

                //Base set to another identifier
                //If the base is set to another configured identifier, it will return
                //the object described by that identifier
                'zooIdentifierBase': {
                    base: 'zooWithBase'
                },

                //If the base is set to an object, that object will be injected
                'objectBase': {
                    base: {name: 'tim'},
                    params: {
                        name: 'alan'
                    }
                },

                //Create instance and mixin some params:
                //This will return an instnace of havok/test/di/asset/Zoo,
                //and mixin values from the params object into the instance
                'zooParams': {
                    base: 'havok/test/di/asset/Zoo',
                    params: {
                        name: 'Zoo with param'
                    }
                },

                //Return module with params mixedin
                'foodsParams': {
                    base: 'havok/test/di/asset/foods',
                    params: {
                        penguin: 'fish',
                        meerkat: 'grubs'
                    }
                },

                //Declare: false explicitly set
                //This is the default setting for directives.declare.
                //It tells the di to create a new intance of the
                //module and return that, if the module has a declare
                'zooDeclareFalse': {
                    base: 'havok/test/di/asset/Zoo',
                    directives: {
                        declare: false
                    },
                    params: {
                        name: 'Zoo instance'
                    }
                },

                //Declare: true
                //It tells the di to use dojo/_base/declare to extend
                //the base with the injections and return the result of declare.
                //This effectively declares a new module. Note that a constructor
                //will be returned, not an instnace.
                'ZooDeclareTrue': {
                    base: 'havok/test/di/asset/Zoo',
                    directives: {
                        declare: true
                    },
                    params: {
                        name: 'Zoo extended'
                    }
                },

                //cache: true
                //Tells the di to cache this result.
                //The next time get is called, the cached result will be returned.
                //directives.cache: true is the default setting
                'zooCacheTrue': {
                    base: 'havok/test/di/asset/Zoo',
                    directives: {
                        cache: true
                    },
                    params: {
                        name: 'Zoo cache true'
                    }
                },

                //cache: false
                //Tells the di not to cache this result.
                //The next time get is called, the a new instnace will be created.
                'zooCacheFalse': {
                    base: 'havok/test/di/asset/Zoo',
                    directives: {
                        cache: false
                    },
                    params: {
                        name: 'Zoo cache false'
                    }
                },

                'lion1': {
                    base: 'havok/test/di/asset/Lion'
                },

                'lion2': {
                    base: 'havok/test/di/asset/Lion',
                    params: {
                        name: 'liz'
                    }
                },

                //Gets
                //This object will be injected with the object listed in the gets property.
                //Each object will be injected from a di.get call.
                //This particular zoo will get the instances of lion1 and lion2
                //configured directly above
                'zooWithGets': {
                    base: 'havok/test/di/asset/Zoo',
                    params: {
                        name: 'Zoo with gets'
                    },
                    gets: {
                        lion1: 'lion1',
                        lion2: 'lion2',
                        tiger: 'havok/test/di/asset/Tiger'
                    }
                },

                //Gets with array
                //This will inject an array of objects created with di.get
                'zooWithGetsArray': {
                    base: 'havok/test/di/asset/Zoo',
                    params: {
                        name: 'Zoo with gets array'
                    },
                    gets: {
                        cage: [
                            'lion1',
                            'lion2'
                        ]
                    }
                },

                //Gets with nested config
                //Any time get is passed an object, it will treat that object as
                //the config for creating the object, rather than looking for
                //and identifier in the di config
                'zooWithNestedGetsConfig': {
                    base: 'havok/test/di/asset/Zoo',
                    params: {
                        name: 'Zoo with nested gets config'
                    },
                    gets: {
                        tiger: {
                            base: 'havok/test/di/asset/Tiger',
                            params: {
                                name: 'tim'
                            }
                        },
                        cage: [
                            'lion2',
                            {
                                base: 'havok/test/di/asset/Lion',
                                params: {
                                    name: 'emma'
                                }
                            }
                        ]
                    }
                },

                //Proxy Methods
                //Rather than getting an object, the di can get a
                //proxy to an object. Proxies mean that the acutal module
                //is not loaded by the AMD loader until a method is called.
                //All proxies have a `diGet` method that can be used
                //to get the object. Proxies will also have any methods defined by
                //the proxyMethods key. If any of these methods are called, the
                //underling object will be loaded, the method called, and the result
                //passed back through the proxy.
                'zooWithProxyMethods': {
                    base: 'havok/test/di/asset/Zoo',
                    proxyMethods: [
                        'listAnimals'
                    ],
                    params: {
                        name: 'Zoo with proxy'
                    },
                    gets: {
                        lion1: 'lion1',
                        lion2: 'lion2',
                        tiger: 'havok/test/di/asset/Tiger'
                    }
                },

                'tigerWithProxyMethods': {
                    base: 'havok/test/di/asset/Tiger',
                    params: {
                        name: 'Josh'
                    },
                    proxyMethods: [
                        'makeSound'
                    ]
                },

                //Proxies can also be inject in the same way as gets
                'zooWithProxies': {
                    base: 'havok/test/di/asset/Zoo',
                    proxyMethods: [
                        'listAnimals'
                    ],
                    params: {
                        name: 'Zoo with proxies'
                    },
                    proxies: {
                        tiger: 'tigerWithProxyMethods',
                        cage: [
                            'lion2',
                            {
                                base: 'havok/test/di/asset/Lion',
                                params: {
                                    name: 'emma'
                                }
                            }
                        ]
                    }
                },

                //Array injections can be spread across params, gets and proxies
                'zooWithSpreadArray': {
                    base: 'havok/test/di/asset/Zoo',
                    params: {
                        animals: [
                            'cobra',
                            'crocodile'
                        ]
                    },
                    gets: {
                        animals: [
                            'lion1',
                            'lion2'
                        ]
                    },
                    proxies: {
                        animals: [
                            'tigerWithProxyMethods'
                        ]
                    }
                }
            }
        }
    }
);

