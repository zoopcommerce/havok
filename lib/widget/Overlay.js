define([
	'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/window',
	'./_WidgetBase',
    './_HideableMixin',
    'dojo/text!./template/Overlay.html',
    '../less!./less/overlay.less'
],

function(
    declare,
    domClass,
    domConstruct,
    domGeom,
    win,
    WidgetBase,
    HideableMixin,
    template
) {

	// module:
	//		havok/widget/Overlay

return declare([WidgetBase, HideableMixin],{
	// summary:
    //      Overlay a dom node to block UI interaction.
    // description:
	//		A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a
	//		particular DOM node is processing and cannot be clicked on at this time.
	//		This widget uses absolute positioning to apply the overlay and image.
    //      Inspired by dojox/widget/Standby

    // templateString: [protected] String
    //		A string that represents the widget template.
    //		Use in conjunction with dojo.cache() to load from a file.
	templateString: template,

    buildRendering: function(){
        this.inherited(arguments);
        domClass.remove(this.domNode, this.baseClass);
        domClass.add(this.overlay, this.baseClass);
    },

    destroy: function(){
        domConstruct.destroy(this.overlay);
        this.inherited(arguments);
    },

    refresh: function(){
        //summary:
        //     Refresh the position of the overlay
        //description:
        //     If the node the overlay is applied to changes size or position,
        //     this method should be called to update size and position of the overlay.
        this._position();
    },

    _show: function(){
        //summary:
        //     Show the overlay
        domConstruct.place(this.overlay, document.body, 'last');
        domClass.remove(this.overlay, 'hide');
        this._position();
    },

    _hide: function(){
        //summary:
        //     Hide the overlay
        domClass.add(this.overlay, 'hide');
        return;
    },

    _position: function(){
        //summary:
        //     Position the overlay to float over the target dom node

        var target = this.domNode.parentNode,
            targetPos,
            containerPos = domGeom.position(this.containerNode);

        if (target == document.body){
            targetPos = win.getBox();
            targetPos.x = 0;
            targetPos.y = 0;
            domClass.add(this.overlay, 'document');
        } else {
            domClass.remove(this.overlay, 'document');

            targetPos = domGeom.position(target, true);

            //overlay position
            this.backdrop.style.top = targetPos.y + 'px';
            this.backdrop.style.left = targetPos.x + 'px';
            this.backdrop.style.height = targetPos.h + 'px';
            this.backdrop.style.width = targetPos.w + 'px';
        }

        //content position
        this.containerNode.style.top = ((targetPos.y + (targetPos.h - containerPos.h) / 2)) + 'px';
        this.containerNode.style.left = ((targetPos.x + (targetPos.w - containerPos.w) / 2)) + 'px';
    }
});
});
