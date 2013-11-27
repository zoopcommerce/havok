define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/on',
    'dijit/_WidgetBase'
],
function (
    declare,
    lang,
    keys,
    domStyle,
    domGeom,
    on,
    WidgetBase
){
    // module:
    //		havok/widget/Movable

    return declare(
        [WidgetBase],
        {

            //moving: false,

            startup: function(){

                this.inherited(arguments);

                if (!this.constraintNode){
                    this.constraintNode = this.domNode.parentNode;
                }

                this.events = [
                    on(this.domNode, 'keypress', lang.hitch(this, 'keypress')),
                    on(this.domNode, 'mousedown', lang.hitch(this, 'mousedown'))
                ];
            },

            setLastPosition: function(){
                var constraintPos = domGeom.position(this.constraintNode),
                    nodePos = domGeom.position(this.domNode);

                this._last = {x: nodePos.x - constraintPos.x, y: nodePos.y - constraintPos.y};

                this._constraint = domGeom.getContentBox(this.constraintNode);
                this._constraint.w = this._constraint.w - nodePos.w;
                this._constraint.h = this._constraint.h - nodePos.h;
            },

            mousedown: function(e){
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

                domStyle.set(this.domNode, 'top', y + 'px');
                domStyle.set(this.domNode, 'left', x + 'px');
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
