define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/dom',
    'dojo/on',
    'dojo/string'
],
function(
    declare,
    lang,
    domGeom,
    domConstruct,
    dom,
    on,
    string
) {
    // module:
    //		havok/widget/_ScrollSpyMixin

    return declare(
        [],
        {
            //scrollSpy: undefined,

            itemTemplate: '<li data-havok-spy-target="${id}"><a href="#${id}">${text}</a></li>',

            //_scrollSpyTimer: undefined,

            //_scrollHandler

            startup: function(){
                this.inherited(arguments);
                this.updateScrollSpy();
            },

            destroy: function(){
                if (this._scrollHandler){
                    this._scrollHandler.remove();
                }
                this.inherited(arguments);
            },

            addItem: function(/*DomNode|String*/item, /*__AddOptions?*/options){

                item = this.inherited(arguments);

                var attr = ['data-havok-spy-target', 'data-spy-target', 'spy-target'],
                    i,
                    node,
                    target;

                for (i=0; i < attr.length; i++){
                    if (node = item.querySelector('[' + attr[i] + ']')){
                        target = node.getAttribute(attr[i]);
                        node.removeAttribute(attr[i]);
                        item.setAttribute(attr[0], target);
                        break;
                    }
                }

                return item;
            },

            refresh: function(){

                if (this.containerNode.children.length == 0){

                    var i,
                        node,
                        text,
                        target = this.scrollSpy;

                    if (typeof target == 'string') target = this.scrollSpy = dom.byId(target);

                    for (i = 0; i < target.children.length; i++) {
                        node = target.children[i];
                        if (node.id){
                            if (!(text = node.getAttribute('title'))) text = node.id;
                            domConstruct.place(string.substitute(this.itemTemplate, {id: node.id, text: text}), this.containerNode, 'last');
                        }
                    }
                }

                this.inherited(arguments);
            },

            _setScrollSpyAttr: function(value){

                if (typeof value == 'string'){
                    value = dom.byId(value);
                }

                var listenTo;
                if (value.scrollHeight > value.clientHeight){
                    // The target is scrollable.
                    listenTo = value;
                } else {
                    listenTo = document;
                }
                if (this._scrollHandler){
                    this._scrollHandler.remove();
                }
                this._scrollHandler = on(listenTo, 'scroll', lang.hitch(this, this.updateScrollSpy));
                this._set('scrollSpy', value);
            },

            updateScrollSpy: function(){

                if (!this._started) return;

                var useDocScroll = false,
                    scrollTop,
                    newActive,
                    activeSpyNode,
                    activeY,
                    y,
                    i,
                    spyNode;

                if (this.scrollSpy.scrollHeight > this.scrollSpy.clientHeight){
                    // The target is scrollable.
                    scrollTop = this.scrollSpy.scrollTop;
                } else {
                    // Use document scroll
                    scrollTop = domGeom.docScroll().y;
                    useDocScroll = true;
                }

                if (this.active){
                    activeSpyNode = this.scrollSpy.querySelector('[id=' + this.active.getAttribute('data-havok-spy-target') + ']');

                    if (useDocScroll){
                        activeY = domGeom.position(activeSpyNode, true).y;
                    } else {
                        activeY = activeSpyNode.offsetTop;
                    }
                    if (activeY > scrollTop){
                        activeY = 0;
                    }
                } else {
                    activeY = 0;
                }

                for (i = 0; i < this.containerNode.children.length; i++){

                    if (!(spyNode = this.scrollSpy.querySelector('[id=' + this.containerNode.children[i].getAttribute('data-havok-spy-target') + ']'))) continue;

                    if (useDocScroll){
                        y = domGeom.position(spyNode, true).y;
                    } else {
                        y = spyNode.offsetTop;
                    }
                    if (y <= scrollTop && y >= activeY){
                        newActive = this.containerNode.children[i];
                        activeY = y;
                    }
                }

                if (newActive){
                    this.set('active', newActive);
                }
            }
        }
    );
});
