define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/dom',
    'dojo/on',
    'dojo/string'
],
function(
    declare,
    lang,
    domAttr,
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
            //spyTarget: undefined,

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

            _renderNodes: function(){

                var node,
                    i,
                    text,
                    target = this.spyTarget;

                if (typeof target == 'string'){
                    target = dom.byId(target);
                }

                for (i = 0; i < target.children.length; i++) {
                    node = target.children[i];
                    if (node.id){
                        if (domAttr.has(node, 'title')){
                            text = domAttr.get(node, 'title');
                        } else {
                            text = node.id;
                        }
                        domConstruct.place(string.substitute(this.itemTemplate, {id: node.id, text: text}), this.containerNode, 'last');
                    }
                }
            },

            _setSpyTargetAttr: function(value){
                if (typeof value == 'string'){
                    value = dom.byId(value);
                }

                var listenTo;
                if (value.scrollHeight > value.clientHeight){
                    // The target is scrollable.
                    listenTo = value;
                } else {
                    listenTo = window;
                }
                if (this._scrollHandler){
                    this._scrollHandler.remove();
                }
                this._scrollHandler = on(listenTo, 'scroll', lang.hitch(this, this.updateScrollSpy));
                this._set('spyTarget', value);
            },

            updateScrollSpy: function(){

                if (!this._started){
                    return;
                }

                var useDocScroll = false,
                    scrollTop,
                    newActive,
                    activeTargetId,
                    activeSpyNode,
                    activeY,
                    y,
                    i,
                    j,
                    spyTargetId,
                    spyNode;

                if (this.spyTarget.scrollHeight > this.spyTarget.clientHeight){
                    // The target is scrollable.
                    scrollTop = this.spyTarget.scrollTop;
                } else {
                    // Use document scroll
                    scrollTop = domGeom.docScroll().y;
                    useDocScroll = true;
                }

                if (this.active){
                    activeTargetId = domAttr.get(this.active, 'data-havok-spy-target');
                    for (i=0; i < this.spyTarget.children.length; i++){
                        if (this.spyTarget.children[i].id == activeTargetId){
                            activeSpyNode = this.spyTarget.children[i];
                            break;
                        }
                    }
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

                j = 0;
                for (i = 0; i < this.containerNode.children.length; i++){
                    spyTargetId = domAttr.get(this.containerNode.children[i], 'data-havok-spy-target');
                    for (j; j < this.spyTarget.children.length; j++){
                        if (this.spyTarget.children[j].id == spyTargetId){
                            spyNode = this.spyTarget.children[j];
                            break;
                        }
                    }
                    if (!spyNode){
                        continue;
                    }
                    if (useDocScroll){
                        y = domGeom.position(spyNode, true).y;
                    } else {
                        y = spyNode.offsetTop;
                    }
                    if (y <= scrollTop && y > activeY){
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
