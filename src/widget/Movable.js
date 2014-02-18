define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dojo/dom-class',
    'dojo/dom-geometry',
    'dojo/on',
    'dijit/registry',
    './_WidgetBase',
    '../less!./less/movable.less'
],
function (
    declare,
    lang,
    keys,
    domClass,
    domGeom,
    on,
    registry,
    WidgetBase
){
    // module:
    //		havok/widget/Movable

    return declare(
        [WidgetBase],
        {
            // summary:
            //		Makes a dom node movable

            /*=====
            // grip: DomNode
            //      The dom node used as the gripper for moving
            grip: undefined,
            =====*/

            /*=====
            // moving: Boolean
            //      Is this widget being moved?
            moving: undefined,
            =====*/

            /*=====
            // constraintNode: DomNode
            //      The dom node used constrain movement
            constraintNode: undefined,
            =====*/

            buildRendering: function(){
                this.inherited(arguments);
                domClass.add(this.domNode, 'movable');
            },

            startup: function(){

                this.inherited(arguments);

                var grip = this.domNode.querySelector('[data-havok-grip]');
                if (grip && registry.getEnclosingWidget(grip) === this){
                    this.grip = grip;
                } else {
                    this.grip = this.domNode;
                }
                domClass.add(this.grip, 'grip');

                if (!this.constraintNode){
                    this.constraintNode = this.domNode.parentNode;
                }

                this.events = [
                    on(this.grip, 'keypress', lang.hitch(this, 'keypress')),
                    on(this.grip, 'mousedown', lang.hitch(this, 'mousedown'))
                ];
            },

            setLastPosition: function(){
                this._last = {
                    x: this.domNode.style.left ? this.domNode.style.left.replace('px', '')*1 : 0,
                    y: this.domNode.style.top ? this.domNode.style.top.replace('px', '')*1 : 0
                };

                this._constraint = domGeom.getContentBox(this.constraintNode);
                this._constraint.w = this._constraint.w - this.domNode.offsetWidth;
                this._constraint.h = this._constraint.h - this.domNode.offsetHeight;
            },

            mousedown: function(e){
                
                e.preventDefault();

                this.set('moving', true);
                this.emit('movestart');

                this.setLastPosition();
                this._mouse = {x: e.pageX, y: e.pageY};

                this.events.push(on(document.body, 'mousemove', lang.hitch(this, 'mousemove')));
                this.events.push(on(document.body, 'mouseup', lang.hitch(this, 'mouseup')));
            },

            mousemove: function(e){
                e.stopPropagation();
                e.preventDefault();

                this.move(
                    this._last.x + e.pageX - this._mouse.x,
                    this._last.y + e.pageY - this._mouse.y
                )
            },

            mouseup: function(e){
                this.events.pop().remove();
                this.events.pop().remove();
                this.set('moving', false);
                this.emit('movestop');
            },

            keypress: function(e){

                e.stopPropagation();
                e.preventDefault();

                this.setLastPosition();

                switch(e.keyCode){
                    case keys.RIGHT_ARROW:
                        this.move(this._last.x + 1, this._last.y);
                        break;
                    case keys.LEFT_ARROW:
                        this.move(this._last.x - 1, this._last.y);
                        break;
                    case keys.UP_ARROW:
                        this.move(this._last.x, this._last.y -1);
                        break;
                    case keys.DOWN_ARROW:
                        this.move(this._last.x, this._last.y + 1);
                        break;
                }
            },

            move: function(x, y){

                if (!this._constraint){
                    this.setLastPosition();
                }

                if (x < 0){
                    x = 0;
                } else if (x > this._constraint.w){
                    x = this._constraint.w;
                }
                if (y < 0){
                    y = 0;
                } else if (y > this._constraint.h){
                    y = this._constraint.h;
                }

                this.domNode.style.top = y + 'px';
                this.domNode.style.left = x + 'px';
                this.emit('moved');
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
