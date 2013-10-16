define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/on',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-geometry',
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
    query,
    domAttr,
    domStyle,
    domConstruct,
    domClass,
    domGeom,
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

            //items: undefined,

            //indicators: undefined,

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
                this.items = {};
                this.indicators = {};
                this.inherited(arguments);
            },

            startup: function(){
                this.inherited(arguments);
                this.refresh();
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
                    id;

                for (i = 0; i < data.length; i++){
                    id = data[i][this.store.idProperty];
                    if (this.items[id]){
                        domConstruct.place(this.items[id], this.itemsNode, 'last');
                        domConstruct.place(this.indicators[id], this.indicatorsNode, 'last');
                    } else {
                        this.items[id] = domConstruct.place(string.substitute(this.itemTemplate, data[i]), this.itemsNode, 'last');
                        this.indicators[id] = domConstruct.place('<li></li>', this.indicatorsNode, 'last');
                    }
                }

                //remove old nodes
                var removed = true;
                while (removed){
                    removed = false;
                    if (this.itemsNode.children.length > 0 &&
                        ((data.length > 0 && this.itemsNode.firstElementChild !== this.items[data[0][this.store.idProperty]]) || data.length == 0)
                    ){
                        this.itemsNode.removeChild(this.itemsNode.firstElementChild);
                        this.indicatorsNode.removeChild(this.indicatorsNode.firstElementChild);
                        removed = true;
                    }
                }

                this.set('active', this.active);
            },

            _setActiveAttr: function(value){

                if (!this.items[value]) {
                    return;
                }

                if (value == this.active) {
                    //direct show
                    domClass.add(this.items[value], 'active');
                    domClass.add(this.indicators[value], 'active');
                } else {
                    //slide required
                    var slideIn,
                        slideOut,
                        i;

                    for (i in this.items){
                        if (i == value) {
                            slideOut = 'left';
                            slideIn = 'right';
                            break;
                        }
                        if (i == this.active) {
                            slideOut = 'right';
                            slideIn = 'left';
                            break;
                        }
                    }

                    domClass.add(this.items[value], 'active ' + slideIn);
                    domClass.add(this.indicators[value], 'active');
                    domClass.add(this.items[this.active], slideOut);
                    domClass.remove(this.indicators[this.active], 'active');
                }

                this._set('active', value);
            },

            cycle: function (){

            },

            pause: function (){

            },

            prev: function(){

            },

            next: function(){

            }
        }
    );
});
