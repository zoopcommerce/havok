define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/on',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-class',
    '../cssfx',
    '../string',
    './_WidgetBase',
    './_StoreMixin',
    'dojo/text!./template/Carousel.html',
    'dojo/text!./template/CarouselItem.html',
    '../less!../vendor/bootstrap/less/carousel.less'
],
function(
    declare,
    lang,
    Deferred,
    when,
    on,
    domAttr,
    domConstruct,
    domClass,
    cssfx,
    string,
    WidgetBase,
    StoreMixin,
    template,
    itemTemplate
) {
    // module:
    //		havok/widget/Carousel

    return declare(
        [WidgetBase, StoreMixin],
        {
            templateString: template,

            itemTemplate: itemTemplate,

            interval: 5000,

            //_intervalObj: undefined,

            paused: false,

            //items: undefined,

            buildRendering: function(){
                if (!this.store){
                    var i,
                        node,
                        item,
                        storeData = [];

                    for (i = 0; i < this.srcNodeRef.children.length; i++){
                        node = this.srcNodeRef.children[i];
                        item = {
                            id: i,
                            title: domAttr.get(node, 'title'),
                            caption: node.lastChild.textContent,
                            img: node.firstElementChild.src
                        };
                        if (domClass.contains(node, 'active')) {
                            this.active = i;
                        }
                        storeData.push(item);
                    }

                    if (storeData.length > 0){
                        this.set('store', {data: storeData});
                    }
                }
                this.items = [];
                this.inherited(arguments);
            },

            startup: function(){
                this.inherited(arguments);
                this.refresh();
                this.cycle();
            },

            refresh: function(){
                if (!this._started){
                    return;
                }

                var result = new Deferred;
                when(this.get('data'), lang.hitch(this, function(data){
                    this._refresh(data);
                    result.resolve();
                }));

                return result;
            },

            _refresh: function(data){

                if (!data){
                    return;
                }

                var i,
                    j,
                    id,
                    found;

                for (i = 0; i < data.length; i++){
                    id = data[i][this.store.idProperty];
                    found = false;
                    for (j = 0; j < this.items.length; j++){
                        if (this.items[j].id == id){
                            domConstruct.place(this.items[j].itemNode, this.itemsNode, 'last');
                            domConstruct.place(this.indicators[j].inicatorNode, this.indicatorsNode, 'last');
                            found = true;
                        }
                    }

                    if (!found) {
                        var indicatorNode = domConstruct.place('<li></li>', this.indicatorsNode, 'last');
                        this._indicatorClick(indicatorNode);
                        this.items.push({
                            id: id,
                            itemNode: domConstruct.place(string.substitute(this.itemTemplate, data[i]), this.itemsNode, 'last'),
                            indicatorNode: indicatorNode
                        });

                    }
                }

                //remove old nodes
                var removed = true;
                while (removed){
                    removed = false;
                    if (this.itemsNode.children.length > 0 &&
                        ((data.length > 0 && this.itemsNode.firstElementChild !== this.items[0].itemNode) || data.length == 0)
                    ){
                        this.itemsNode.removeChild(this.itemsNode.firstElementChild);
                        this.indicatorsNode.removeChild(this.indicatorsNode.firstElementChild);
                        removed = true;
                    }
                }

                this.set('active', this.active);
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
