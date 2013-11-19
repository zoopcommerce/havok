define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-geometry',
    'dojo/dom-class'
],
function(
    declare,
    lang,
    on,
    dom,
    domGeom,
    domClass
) {
    // module:
    //		havok/widget/_AffixMixin

    return declare(
        [],
        {
            // summary:
            //		Mixin to to fix a widget in the viewport

            // affix: Boolean
            //      Toggles affix behaviour
            affix: true,

            /*=====
            // affixTarget: DomNode
            //      The dom node to affix to
            affixTarget: undefined,
            =====*/

            // viewportOffsetTop: int
            //      Distance in pixels from the top of the viewport that affixing should be applied.
            viewportOffsetTop: 0,

            // viewportOffsetBottom: int
            //      Distance in pixels from the bottom of the viewport that affixing should be applied.
            viewportOffsetBottom: 0,

            /*=====
            // _affixScrollSignal: Object
            //      Handler for scroll events
            _affixScrollSignal: undefined,
            =====*/

            startup: function(){
                this.inherited(arguments);
                if (!this.affixTarget){
                    this.affixTarget = this.domNode.parentElement;
                }
                this.updateAffix();
            },

            _setAffixAttr: function(/*Boolean*/value){
                if (value){
                    this._affixScrollSignal = on(this.ownerDocument, 'scroll', lang.hitch(this, this.updateAffix));
                } else if (this._affixScrollSignal){
                    this._affixScrollSignal.remove();
                    delete(this._affixScrollSignal);
                }
                this._set('affix', value);
            },

            _setAffixTargetAttr: function(/*DomNode*/value){
                if (typeof value == 'string'){
                    value = dom.byId(value);
                }
                this._set('affixTarget', value);
            },

            updateAffix: function(){
                var scrollTop = domGeom.docScroll().y,
                    targetNodePos = domGeom.position(this.get('affixTarget'), true),
                    domNodePos = domGeom.position(this.domNode, true),
                    offsetTop,
                    offsetBottom,
                    add,
                    remove;

                if (typeof this.viewportOffsetTop == 'function'){
                    offsetTop = this.viewportOffsetTop();
                } else {
                    offsetTop = this.viewportOffsetTop;
                }
                if (typeof this.viewportOffsetBottom == 'function'){
                    offsetBottom = this.viewportOffsetBottom();
                } else {
                    offsetBottom = this.viewportOffsetBottom;
                }

                if (targetNodePos.y - scrollTop - offsetTop > 0){
                    add = 'affix-top';
                    remove = 'affix affix-bottom';
                } else if (scrollTop + offsetTop + domNodePos.h + offsetBottom - targetNodePos.y - targetNodePos.h > 0){
                    add = 'affix-bottom';
                    remove = 'affix affix-top';
                } else {
                    add = 'affix';
                    remove = 'affix-top affix-bottom';
                }

                domClass.add(this.domNode, add);
                domClass.remove(this.domNode, remove);
            },

            destroy: function(){
                if (this._affixScrollSignal){
                    this._affixScrollSignal.remove();
                }
                this.inherited(arguments);
            }
        }
    );
});
