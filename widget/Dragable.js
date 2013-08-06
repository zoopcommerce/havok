define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/on',
    'dijit/registry',
    'dijit/_WidgetBase',
    '../less!./less/dragable.less'
],
function (
    declare,
    lang,
    query,
    domAttr,
    domClass,
    on,
    registry,
    WidgetBase
){
    // module:
    //		havok/widget/Dragable

    return declare(
        [WidgetBase],
        {
            //grip: undefined,

            //dragging: false,

            startup: function(){

                this.inherited(arguments);

                query('[data-dojo-attach-point]', this.domNode).forEach(lang.hitch(this, function(attachNode){
                    if (registry.getEnclosingWidget(attachNode) === this){
                        this[domAttr.get(attachNode, 'data-dojo-attach-point')] = attachNode;
                    }
                }));
                if (!this.grip){
                    this.grip = this.domNode;
                }

                domClass.add(this.grip, 'grip');
                this.events = [
                    on(this.domNode, 'dragstart', lang.hitch(this, 'dragstart')),
                    on(this.domNode, 'dragend', lang.hitch(this, 'dragend'))
                ];

                if (this.grip !== this.domNode){
                    this.events.push(on(this.grip, 'mousedown', lang.hitch(this, 'mousedown')))
                } else {
                    domAttr.set(this.domNode, 'draggable', true);
                }
            },

            mousedown: function(e){
                domAttr.set(this.domNode, 'draggable', true);
            },

            dragstart: function(e){
                domClass.add(this.domNode, 'dragging');

                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('application/widget', this.id);
                e.dataTransfer.setData('text/html', this.domNode.outerHTML);

                this.set('dragging', true);
            },

            dragend: function(e){
                domClass.remove(this.domNode, 'dragging');
                if (this.grip !== this.domNode){
                    domAttr.remove(this.domNode, 'draggable', false);
                }
                this.set('dragging', false);
            },

            destroy: function(){
                while (this.events.length > 0){
                    this.events.pop().remove();
                }
                this.inherited(arguments);
            }
        }
    );
});
