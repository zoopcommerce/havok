define([
	"dojo/_base/array", // forEach()
	"dojo/_base/declare", // declare()
	"dojo/_base/lang",	// hitch()
	"../parser/parser"
], function(array, declare, lang, parser){

	// module:
	//		havok/widget/_WidgetsInTemplateMixin

	return declare([], {
		// summary:
		//		Mixin to supplement _TemplatedMixin when template contains widgets

		_beforeFillContent: function(){

            // Before copying over content, instantiate widgets in template
            var node = this.domNode;

            parser.parse(node, {startup: false}).then(lang.hitch(this, function(widgets){
                this._startupWidgets = widgets;

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
            }));
		},

		_processTemplateNode: function(/*DOMNode|Widget*/ baseNode, getAttrFunc, attachFunc){
			// Override _AttachMixin._processNode to skip DOMNodes with data-dojo-type set.   They are handled separately
			// in the _beforeFillContent() code above.

			if(getAttrFunc(baseNode, "dojoType") || getAttrFunc(baseNode, "data-dojo-type")){
				return true;
			}

			return this.inherited(arguments);
		},

		startup: function(){
			array.forEach(this._startupWidgets, function(w){
				if(w && !w._started && w.startup){
					w.startup();
				}
			});
			this._startupWidgets = null;
			this.inherited(arguments);
		}
	});
});
