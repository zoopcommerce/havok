define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    '../cssfx',
    './_WidgetBase',
    'dojo/text!./template/Carousel.html',
    '../less!./less/carousel.less'
],
function(
    declare,
    lang,
    on,
    domConstruct,
    domClass,
    cssfx,
    WidgetBase,
    template
) {
    // module:
    //		havok/widget/Carousel

    return declare(
        [WidgetBase],
        {
            templateString: template,

            interval: 5000,

            //_intervalObj: undefined,

            paused: false,

            //items: undefined,

            buildRendering: function(){
                this.inherited(arguments);
                this.refresh();
            },

            startup: function(){
                this.inherited(arguments);
                this.set('active', this.active);
                this.cycle();
            },

            refresh: function(){

                var i,
                    active,
                    captionNode,
                    itemNode,
                    newItemNode,
                    indicatorNode;

                this.items = [];

                this.indicatorsNode.innerHTML = ''
                for (i = 0; i < this.containerNode.children.length; i++){
                    itemNode = this.containerNode.children[i];
                    if (domClass.contains(itemNode, 'active')) {
                        active = i;
                    }
                    if (captionNode = itemNode.querySelector('figcaption')) domClass.add(captionNode, 'carousel-caption')
                    if (itemNode.tagName == 'IMG') {
                        newItemNode = domConstruct.place('<div></div>', itemNode, 'after');
                        newItemNode.appendChild(itemNode);
                        itemNode = newItemNode;
                    }
                    domClass.add(itemNode, 'item');
                    indicatorNode = domConstruct.place('<li></li>', this.indicatorsNode);
                    this._indicatorClick(indicatorNode);
                    this.items.push({
                        id: i,
                        itemNode: itemNode,
                        indicatorNode: indicatorNode
                    });
                }

                if (!active) active = 0;
                this.active = active;
                this.set('active', active);
            },

            _indicatorClick: function(node){
                on(node, 'click', lang.hitch(this, function(){
                    for (var k = 0; k < this.items.length; k++){
                        if (this.items[k].indicatorNode == node) {
                            this.set('active', k);
                            break;
                        }
                    }
                }));
            },

            _setActiveAttr: function(value){
                if (!this._started) return;

                var dir = 1;
                if (value < this.active) {
                    dir = -1;
                }
                this._slide(value, dir);
            },

            _slide: function(value, dir){
                var item,
                    order,
                    slideTo;

                if (value < 0) {
                    value = this.items.length - 1;
                } else if (value > this.items.length - 1) {
                    value = 0;
                }
                item = this.items[value];

                if (value == this.active) {
                    //direct show, no slide needed
                    domClass.add(item.itemNode, 'active');
                    domClass.add(item.indicatorNode, 'active');
                    return;
                }

                if (dir == 1){
                    order = 'next';
                    slideTo = 'left';
                } else {
                    order = 'prev';
                    slideTo = 'right'
                }

                domClass.add(item.itemNode, order);
                item.itemNode.offsetWidth; // force reflow
                domClass.add(this.items[this.active].itemNode, slideTo);
                domClass.add(item.itemNode, slideTo);
                on.once(item.itemNode, cssfx.transitionEndEvent(), lang.hitch(this, function(){
                    domClass.add(item.itemNode, 'active');
                    domClass.remove(this.items[this.active].itemNode, 'active ' + slideTo);
                    domClass.remove(item.itemNode, order + ' ' + slideTo);
                    domClass.add(item.indicatorNode, 'active');
                    domClass.remove(this.items[this.active].indicatorNode, 'active');
                    this._set('active', value);
                }));
            },

            cycle: function (){
                this.paused = false;
                if (this._intervalObj){
                    clearInterval(this._intervalObj);
                }
                this._intervalObj = setInterval(lang.hitch(this, function(){
                    if (this.paused) {
                        clearInterval(this._intervalObj);
                    } else {
                        this.next();
                    }
                }), this.interval);
            },

            pause: function (){
                this.paused = true;
                clearInterval(this._intervalObj);
            },

            prev: function(){
                this._slide(this.active - 1, -1);
            },

            next: function(){
                this._slide(this.active + 1, 1);
            },

            onPrev: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.prev();
            },

            onNext: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.next();
            },

            onMouseenter: function(){
                this.pause();
            },

            onMouseleave: function(){
                this.cycle();
            }
        }
    );
});
