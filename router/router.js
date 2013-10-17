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
    return {

        // if the base url is undefined, it will be set to the
        // url when the router is started
        //baseUrl: undefined,

        // routes: array
        //
        routes: [],

        // di: havok/di/Di
        //    This must be an instance of the Di. This is where
        //    the configured controller instances will be pulled from.
        //di: undefined,

        //the currently active route
        //active: undefined,

        startup: function(){

            if ( ! this.baseUrl){
                var base = window.location.href.split('/');
                base.pop();
                this.baseUrl = base.join('/');
            }

            on(window, 'popstate', lang.hitch(this, function(e){
                if (e.state){
                    this.go(e.state.route, true);
                }
            }));

            // Catch click events on anchor tags
            on(document.body, 'click', lang.hitch(this, function(e){
                if (e.target.nodeType == 1 && e.target.nodeName == 'A'){
                    if (!e.target.attributes['href']){
                        return;
                    }
                    var route = e.target.attributes['href'].nodeValue;
                    if (route && this.go(route)){
                        e.preventDefault();
                    }
                }
            }));

            // Go to inital route
            this.go(window.location.href);
        },

        resolve: function(route){

            // strip off the base url first
            if (route.indexOf(this.baseUrl) == 0){
                route = route.substring(this.baseUrl.length + 1);
            }

            // check for absolute url - these are not routed
            if (route.indexOf('http://') == 0){
                return ({ignore: true});
            }

            // check for in page hash navigation - these are not routed
            if (route.indexOf('#') == 0) {
                return ({ignore: true});
            }

            //strip off any hash, in page navigation is not the business of the router
            route = route.split('#')[0];

            var pieces = route.split('/'),
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
                return ({ignore: true});
            }

            //identify the correct method
            if (pieces[1]){
                if (config.methods[pieces[1]]){
                    method = config.methods[pieces[1]];
                } else {
                    throw new RouteNotFound(string.substitute(
                        messages.methodNotConfigured,
                        {method: pieces[1], controller: config.controller}
                    ));
                }
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
                return {route: method};
            }

            for (i = 2; i < pieces.length; i++){
                args.push(pieces[i]);
            }

            return lang.mixin({route: route, controller: config.controller, args: args}, method);
        },

        go: function(route, surpressPushState){
            // route may be a string, which will be routed, or a number which move to a relative point in history

            if (typeof(route) != 'string'){
                history.go(route);
                return true;
            }

            if (this.active && route == this.active.route){
                //Don't do anything if the route hasn't changed
                return true;
            }

            var routeMatch = this.resolve(route);

            if (routeMatch.ignore){
                return false;
            }
            if (typeof(routeMatch.route) != 'string'){
                history.go(routeMatch.route);
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

                //Route resolved correctly - pushState and call the controller
                if ( ! surpressPushState){
                    history.pushState({route: routeMatch.route}, '', this.baseUrl + '/' + routeMatch.route);
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