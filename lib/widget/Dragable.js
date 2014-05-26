define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/on',
    'dijit/registry',
    'dijit/_WidgetBase',
    './_HandlersMixin',
    '../get!./dragData',
    '../less!./less/dragable.less'
],
function (
    declare,
    lang,
    domClass,
    on,
    registry,
    WidgetBase,
    HandlersMixin,
    dragData
){
    // module:
    //		havok/widget/Dragable

    return declare(
        [WidgetBase, HandlersMixin],
        {
            // summary:
            //		Makes a dom node draggable

            /*=====
            // grip: DomNode
            //      The dom node used as the gripper for dragging
            grip: undefined,
            =====*/

            /*=====
            // dragging: Boolean
            //      Is this widget being dragged?
            dragging: undefined,
            =====*/

            startup: function(){

                this.inherited(arguments);

                var grip = this.domNode.querySelector('[data-havok-grip]');
                if (grip && registry.getEnclosingWidget(grip) === this) this.grip = grip
                else this.grip = this.domNode

                domClass.add(this.grip, 'grip');

                this.addHandler(on(this.domNode, 'dragstart', lang.hitch(this, this._dragstart)));
                this.addHandler(on(this.domNode, 'dragend', lang.hitch(this, this._dragend)));

                if (this.grip !== this.domNode) this.addHandler(on(this.grip, 'mousedown', lang.hitch(this, this._mousedown)))
                else this.domNode.setAttribute('draggable', true)
            },

            _mousedown: function(/*Event*/e){
                this.domNode.setAttribute('draggable', true);
            },

            _dragstart: function(/*Event*/e){
                domClass.add(this.domNode, 'dragging');

                e.dataTransfer.effectAllowed = 'move';
                dragData['application/widget'] = this.id;
                dragData['text/html'] = this.domNode.outerHTML;
                e.dataTransfer.setData('application/widget', this.id);
                e.dataTransfer.setData('text/html', this.domNode.outerHTML);

                this.set('dragging', true);
            },

            _dragend: function(/*Event*/e){
                domClass.remove(this.domNode, 'dragging');
                if (this.grip !== this.domNode) this.domNode.removeAttribute('draggable', false)

                delete(dragData['application/widget']);
                delete(dragData['text/html']);

                this.set('dragging', false);
            }
        }
    );
});
