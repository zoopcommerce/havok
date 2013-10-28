define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/dom',
    'dojo/string',
    'dojo/query'
],
function(
    declare,
    lang,
    domAttr,
    domGeom,
    domConstruct,
    dom,
    string,
    query
) {
    // module:
    //		havok/widget/_ScrollSpyMixin

    return declare(
        [],
        {

            scrollSpy: true,

            //spyTarget: undefined,

            itemTemplate: '<li spy-target="${id}"><a href="#${id}">${text}</a></li>',

            startup: function(){
                this.inherited(arguments);
                this.updateScrollSpy();
            },

            _renderNodes: function(){

                var spyNodes = query('> [id]', this.spyTarget),
                    text;

                spyNodes.forEach(lang.hitch(this, function(node){
                    if (domAttr.has(node, 'title')){
                        text = domAttr.get(node, 'title');
                    } else {
                        text = node.id;
                    }
                    domConstruct.place(string.substitute(this.itemTemplate, {id: node.id, text: text}), this.containerNode, 'last');
                }));
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
                    newActive,
                    activeSpyNode,
                    activeY,
                    y,
                    i,
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
                    activeSpyNode = query('#' + domAttr.get(this.active, 'spy-target'), this.spyTarget)[0];
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
                    var id = domAttr.get(this.containerNode.children[i], 'spy-target');
                    spyNode = query('#' + domAttr.get(this.containerNode.children[i], 'spy-target'), this.spyTarget)[0];
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

                setTimeout(lang.hitch(this, 'updateScrollSpy'), 250);
            }
        }
    );
});
