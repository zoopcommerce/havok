define([
	'dojo/_base/array', // forEach()
	'dojo/_base/declare', // declare()
	'dojo/_base/lang',	// hitch()
    'dojo/Deferred',
	'../parser/parser'
], function(array, declare, lang, Deferred, parser){

	// module:
	//		havok/widget/_WidgetsInTemplateMixin

	return declare([], {
		// summary:
		//		Mixin to supplement _TemplatedMixin when template contains widgets

        // _parseComplete: undefined,

		_beforeFillContent: function(){

            // Before copying over content, instantiate widgets in template
            var node = this.domNode;

            this._parseComplete = new Deferred;

            parser.parse(node, {startup: false}).then(lang.hitch(this, function(widgets){

                // Hook up attach points and events for nodes that were converted to widgets
                for(var i = 0; i < widgets.length; i++){
                    this._processTemplateNode(widgets[i], function(n,p){
                        // callback to get a property of a widget
                        return n[p];
                    }, function(widget, type, callback){
                        // callback to do data-dojo-attach-event to a widget
                        return widget.on(type, callback, true);
                    });
                }
                this._parseComplete.resolve(widgets);
            }));
		},

		startup: function(){
            this._parseComplete.then(lang.hitch(this, function(widgets){
                array.forEach(widgets, function(w){
                    if(w && !w._started && w.startup){
                        w.startup();
                    }
                });
            }))
            this.inherited(arguments);
		}
	});
});
