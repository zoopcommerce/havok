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

            /*=====
            // affix: String|DomNode|Boolean
            //      The dom node to affix to
            //      If set to false, affixing is turned off
            affix: undefined,
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
                if (this.affix == undefined) this.set('affix', this.domNode.parentNode);
                this.updateAffix();
            },

            _setAffixAttr: function(/*String|DomNode|Boolean*/value){

                if (this._affixScrollSignal){
                    this._affixScrollSignal.remove();
                    delete(this._affixScrollSignal);
                }

                if (typeof value == 'string') value = dom.byId(value);

                this._affixScrollSignal = on(document, 'scroll', lang.hitch(this, this.updateAffix));
                this._set('affix', value);
            },

            updateAffix: function(){
                if (!this._started || !this.affix) return;

                var scrollTop = domGeom.docScroll().y,
                    targetNodePos = domGeom.position(this.get('affix'), true),
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
