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
    //		havok/widget/Affix

    return declare(
        [],
        {
            affix: true,

            //affixTarget: undefined,

            viewportOffset: {
                top: 0,
                bottom: 0
            },

            //_affixScrollSignal: undefined,

            startup: function(){
                this.inherited(arguments);
                if (!this.affixTarget){
                    this.affixTarget = this.domNode.parentElement;
                }
                this.updateAffix();
            },

            _setAffixAttr: function(value){
                if (value){
                    this._affixScrollSignal = on(window, 'scroll', lang.hitch(this, 'updateAffix'));
                } else if (this._affixScrollSignal){
                    this._affixScrollSignal.remove();
                    delete(this._affixScrollSignal);
                }
                this._set('affix', value);
            },

            _setAffixTargetAttr: function(value){
                if (typeof value == 'string'){
                    value = dom.byId(value);
                }
                this._set('affixTarget', value);
            },

            _getAffixTargetAttr: function(){
                return this.affixTarget;
            },

            updateAffix: function(){
                var scrollTop = domGeom.docScroll().y,
                    targetNodePos = domGeom.position(this.get('affixTarget'), true),
                    domNodePos = domGeom.position(this.domNode, true),
                    offsetTop,
                    offsetBottom,
                    add,
                    remove;

                if (typeof this.viewportOffset.top == 'function'){
                    offsetTop = this.viewportOffset.top();
                } else {
                    offsetTop = this.viewportOffset.top;
                }
                if (typeof this.viewportOffset.bottom == 'function'){
                    offsetBottom = this.viewportOffset.bottom();
                } else {
                    offsetBottom = this.viewportOffset.bottom;
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
