define([
    'dojo/_base/lang',
    'dojo/on',
    'dojo/when',
    'dojo/string',
    'dojo/i18n!../nls/router',
    './exception/RouteNotFound',
    'dojo/domReady!'
],
function (
    lang,
    on,
    when,
    string,
    messages,
    RouteNotFound
){
	// module:
	//		havok/router/router

    /*=====
    var __RouteDef = {
        // regex: String
        //      Used to test if the requested path matches with this route.
        // controller: String
        //      The name of a controller instance that can be retrieved through the di instance.
        // defaultMethod: String|Object
        //      If a String, defines the name of the entry method to call on the controller if there is no method match.
        //      If an Object, it must have the form `{entry: String, exit: String}` and can define both the entry and exit methods to call on the controller if there is no method match.
        // methods: Object
        //      An array of path to method name pairs.
    };
    =====*/

    /*=====
    var __RouteMatch = {
        // ignore: Boolean
        //      If true, no matching route was found
        // path: String
        // controller: String
        // entry: String
        // exit: String
        // args: String[]
        //      Any arguments passed to the controller entry method
    };
    =====*/

    return {
		// summary:
		//		Manage page changes using html5 pushState api.
        // description:
        //      The router lets you manage the browser location for simple dynamic page loading, without having to use # hacks.
        //      See [router docs](/services.html#router) for usage examples.

		// baseUrlDefault: String
		//		If the baseUrl of the router is not explicitly given, this property defines
        //		how the baseUrl should be set.
        //
        //		If set to `page`, the baseUrl is set using
        //      windown.location.pathname when the router is started.
        //
        //      If set to `site`, the baseUrl is set using window.location.hostname when
        //      the router is started.
        baseUrlDefault: 'page', //page | site,

        // routes: __RouteDef[]
        //      Array of Route objects that defines the mapping between urls and controller instances
        routes: [],

        /*=====
        // di: Object
        //      Must be an instance of [havok\di\Di](../di/Di.html). This is where controller instances will be pulled from.
        di: undefined,
        =====*/

        /*=====
        // active: __RouteMatch
        //      Holds information about the currently active route.
        active: undefined,
        =====*/

        startup: function(){
            // summary:
            //      Start the router listening to click events.

            if ( ! this.baseUrl){
                if (this.baseUrlDefault == 'page') {
                    var base = window.location.pathname.split('/');
                    base.pop();
                    this.baseUrl = base.join('/');
                } else {
                    this.baseUrl = window.location.protocol + window.location.port + '//' + window.location.hostname;
                }
            }


            on(window, 'popstate', lang.hitch(this, function(e){
                if (e.state){
                    this.go(e.state.path, true);
                }
            }));

            // Catch click events on anchor tags
            on(document.body, 'click', lang.hitch(this, function(e){
                if (e.target.nodeType == 1 && e.target.nodeName == 'A'){
                    if (!e.target.nodeName == 'A'){
                        return;
                    }
                    var path = e.target.href;
                    if (path && this.go(path)){
                        e.preventDefault();
                    }
                }
            }));

            // Go to inital path
            this.go(window.location.href);
        },

        resolve: function(/*String*/path){
            // summary:
            //      Attempt to resolve the provided path to a configured Route
            // returns: __RouteMatch
            //

            // strip off the base url
            if (path.indexOf(this.baseUrl) == 0){
                path = path.substring(this.baseUrl.length + 1);
            }

            // check for absolute url - these are not routed
            if (path.indexOf('http://') == 0){
                return {ignore: true};// __RouteMatch
            }

            // check for in page hash navigation - these are not routed
            if (path.indexOf('#') == 0) {
                return {ignore: true};// __RouteMatch
            }

            //strip off any hash, in page navigation is not the business of the router
            path = path.split('#')[0];

            var pieces = path.split('/'),
                config,
                method,
                args = [],
                i;

            //Check routes in reverse order - first registerd means last checked
            for (i = this.routes.length - 1; i >= 0; i--){
                if (!this.routes[i].regex.test){
                    this.routes[i].regex = new RegExp(this.routes[i].regex);
                }
                if (this.routes[i].regex.test(pieces[0])){
                    config = this.routes[i];
                    break;
                }
            }
            if (!config){
                throw new RouteNotFound(string.substitute(
                    messages.noConfig,
                    {controller: pieces[0]}
                ));
            }
            if (config.ignore){
                return {ignore: true};// __RouteMatch
            }

            //identify the correct method
            if (pieces[1] && config.methods && config.methods[pieces[1]]) {
                method = config.methods[pieces[1]];
            } else if (config.defaultMethod) {
                method = config.defaultMethod;
            } else {
                throw new RouteNotFound(string.substitute(
                    messages.noDefaultMethod,
                    {controller: config.controller}
                ));
            }
            if (typeof(method) == 'string'){
                method = {enter: method};
                if (config.defaultMethod.hasOwnProperty('exit')){
                    method.exit = config.defaultMethod.exit;
                }
            } else if (typeof(method) != 'object') {
                // method is an integer. history.go should be used, rather than calling a controller.
                return {path: method};// __RouteMatch
            }

            for (i = 2; i < pieces.length; i++){
                args.push(pieces[i]);
            }

            return lang.mixin({path: path, controller: config.controller, args: args}, method);// __RouteMatch
        },

        go: function(/*String|int*/path, /*Boolean?*/surpressPushState){
            // summary:
            //      change page location to the given path
            // path:
            //      path may be a string, which will be routed, or a number which move to a relative point in history
            // surpressPushState:
            //      if true, the pushState api will not be used. ie, the address bar will not change
            // returns: boolean
            //      returns `true` if the router actively managed a page change.
            //      returns `false` if the router didn't do anything

            if (typeof(path) != 'string'){
                history.go(path);
                return true;
            }

            var routeMatch = this.resolve(path);

            if (routeMatch.ignore){
                return false;
            }
            if (this.active && routeMatch.path == this.active.path){
                //Don't do anything if the path hasn't changed
                return false;
            }

            if (typeof(routeMatch.path) != 'string'){
                history.go(routeMatch.path);
                return true;
            }

            //load the correct controller
            when(this.di.get(routeMatch.controller), lang.hitch(this, function(controller){

                if (! controller[routeMatch.enter]){
                    throw new RouteNotFound(string.substitute(
                        messages.noMethod,
                        {method: routeMatch.enter, controller: routeMatch.controller}
                    ));
                }
                if (routeMatch.exit && ! controller[routeMatch.exit]){
                    throw new RouteNotFound(string.substitute(
                        messages.noMethod,
                        {method: routeMatch.exit, controller: routeMatch.controller}
                    ));
                }

                //Path resolved correctly - pushState and call the controller
                if ( ! surpressPushState){
                    history.pushState({path: routeMatch.path}, '', this.baseUrl + '/' + routeMatch.path);
                }

                if (this.active && this.active.exit){
                    this.active.controller[this.active.exit]();
                }

                routeMatch.controller = controller;
                this.active = routeMatch;
                controller[routeMatch.enter].apply(routeMatch.controller, routeMatch.args);
            }));

            return true;
        }
    }
});