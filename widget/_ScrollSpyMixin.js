define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom-geometry',
    'dojo/dom',
    'dojo/query'
],
function(
    declare,
    lang,
    domAttr,
    domGeom,
    dom,
    query
) {
    // module:
    //		havok/widget/_ScrollSpyMixin

    return declare(
        [],
        {

            scrollSpy: true,

            //spyTarget: undefined,

            generateSpyStore: true,

            startup: function(){
                this.inherited(arguments);
                this.updateScrollSpy();
            },

            _domToStoreData: function(){
                if ( ! this.generateSpyStore){
                    return this.inherited(arguments);
                }

                var spyNodes = query('> [id]', this.spyTarget),
                    storeData = [],
                    text;

                spyNodes.forEach(function(node){
                    if (domAttr.has(node, 'title')){
                        text = domAttr.get(node, 'title');
                    } else {
                        text = node.id;
                    }
                    storeData.push({id: node.id, type: 'link', href: '#' + node.id, text: text, spy: node});
                });

                return {data: storeData};
            },

            _setScrollSpyAttr: function(value){
                if (value){
                    this.updateScrollSpy();
                }
                this._set('scrollSpy', !!value);
            },

            _setSpyTargetAttr: function(value){
                if (typeof value == 'string'){
                    value = dom.byId(value);
                }
                this._set('spyTarget', value);
            },

            updateScrollSpy: function(){

                if (!this.scrollSpy || !this._started){
                    return;
                }

                var useDocScroll = false,
                    scrollTop,
                    active = this.active,
                    activeY,
                    y,
                    i,
                    spyNode,
                    getNode = function(node){
                        if (node && typeof node == 'string'){
                            return dom.byId(node);
                        }
                        return node;
                    };

                if (this.spyTarget.scrollHeight > this.spyTarget.clientHeight){
                    // The target is scrollable.
                    scrollTop = this.spyTarget.scrollTop;
                } else {
                    // Use document scroll
                    scrollTop = domGeom.docScroll().y;
                    useDocScroll = true;
                }

                if (active && active.spy){
                    active.spy = getNode(active.spy);
                    if (useDocScroll){
                        activeY = domGeom.position(active.spy, true).y;
                    } else {
                        activeY = active.spy.offsetTop;
                    }
                    if (activeY > scrollTop){
                        activeY = 0;
                    }
                } else {
                    activeY = 0;
                }

                for ( i = 0; i < this.store.data.length; i++){
                    spyNode = this.store.data[i].spy = getNode(this.store.data[i].spy);
                    if (!spyNode){
                        continue;
                    }
                    if (useDocScroll){
                        y = domGeom.position(this.store.data[i].spy, true).y;
                    } else {
                        y = spyNode.offsetTop;
                    }
                    if (y <= scrollTop && y > activeY){
                        active = this.store.data[i];
                        activeY = y;
                    }
                }

                if (active !== this.active){
                    this.set('active', active);
                }

                setTimeout(lang.hitch(this, 'updateScrollSpy'), 250);
            }
        }
    );
});
