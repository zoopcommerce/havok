define([
	'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
	'dojo/dom-style',
    'dojo/window',
	'./_WidgetBase',
    './_HideableMixin',
    'dojo/text!./template/Overlay.html',
    '../less!./less/overlay.less'
],

function(
    declare,
    dom,
    domClass,
    domConstruct,
    domGeom,
    domStyle,
    win,
    WidgetBase,
    HideableMixin,
    template
) {

return declare([WidgetBase, HideableMixin],{
	// summary:
	//		A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a
	//		particular DOM node is processing and cannot be clicked on at this time.
	//		This widget uses absolute positioning to apply the overlay and image.
    //      Inspired by dojox/widget/Standby

	//target: undefined,

    //content: undefined,

	templateString: template,

    buildRendering: function(){
        this.inherited(arguments);

        if (this.content){
            this.containerNode.innerHTML = this.content;
        }
    },

    startup: function(){

        if (typeof this.target == 'string') {
            this.target = dom.byId(this.target);
        } else if ( ! this.target){
            this.target = this.domNode.previousElementSibling;
        }
        this.inherited(arguments);
    },

    destroy: function(){
        domConstruct.destroy(this.overlay);
        this.inherited(arguments);
    },

    refresh: function(){
        this._position();
    },

    _show: function(){
        domConstruct.place(this.overlay, document.body, 'last');
        domClass.remove(this.overlay, 'hide');
        this._position();
    },

    _hide: function(){
        domClass.add(this.overlay, 'hide');
        return;
    },

    _position: function(){

        var targetPos,
            containerPos = domGeom.position(this.containerNode);

        if (this.target == document.body){
            targetPos = win.getBox();
            targetPos.x = 0;
            targetPos.y = 0;
            domClass.add(this.backdrop, 'overlay-overlay-document');
            domClass.add(this.containerNode, 'overlay-content-document');
        } else {
            domClass.remove(this.backdrop, 'overlay-overlay-document');
            domClass.remove(this.containerNode, 'overlay-content-document');

            targetPos = domGeom.position(this.target, true);

            //overlay position
            domStyle.set(this.backdrop, 'top', targetPos.y + 'px');
            domStyle.set(this.backdrop, 'left', targetPos.x + 'px');
            domStyle.set(this.backdrop, 'height', targetPos.h + 'px');
            domStyle.set(this.backdrop, 'width', targetPos.w + 'px');
        }

        //content position
        domStyle.set(this.containerNode, 'top', ((targetPos.y + (targetPos.h - containerPos.h) / 2)) + 'px');
        domStyle.set(this.containerNode, 'left', ((targetPos.x + (targetPos.w - containerPos.w) / 2)) + 'px');
    }
});
});
