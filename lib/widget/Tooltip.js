define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-geometry',
    './_WidgetBase',
    './_HideableMixin',
    'dojo/text!./template/Tooltip.html',
    '../less!./less/tooltip.less'
],
function(
    declare,
    lang,
    on,
    dom,
    domConstruct,
    domClass,
    domGeom,
    WidgetBase,
    HideableMixin,
    template
){
    // module:
    //		havok/widget/Tooltip

    return declare(
        [WidgetBase, HideableMixin],
        {
            // summary:
            //      Widget to display tooltips.

            // templateString: String
            templateString: template,

            // showOn: String
            //      The name of the event to trigger tooltip show
            showOn: 'mouseover',

            // hideOn: String
            //      The name of the event to trigger tooltip hide
            hideOn: 'mouseout',

            /*=====
            // title: String
            //      The content to show in the tooltip
            title: undefined,
            =====*/

            // placement: String
            //      Where to place the tooltip relative to target.
            //      May be top | bottom | left | right
            //      Defaults to `top`
            placement: 'top',

            // hidden: Boolean
            //      Is the tooltip hidden?
            //      Defalts to `true`
            hidden: true,

            /*=====
            // target: DomNode
            //      The dom node which the tooltip will be displayed next to
            target: undefined,
            =====*/

            // tag: String
            //      The tag that the tooltip will be rendered with.
            //      Defalts to 'span'
            tag: 'span',

            buildRendering: function(){
                this.inherited(arguments);
                domClass.remove(this.domNode, this.baseClass);
                domClass.add(this.tooltip, this.baseClass);
            },

            startup: function(){

                this.inherited(arguments);

                if (!this.target) this.target = this.domNode;
                if (typeof this.target == 'string') this.target = dom.byId(this.target);

                if (this.showOn) {
                    on(this.target, this.showOn, lang.hitch(this, function(e){
                        e.preventDefault();
                        this.show();
                    }))
                }
                if (this.hideOn) {
                    on(this.target, this.hideOn, lang.hitch(this, function(e){
                        e.preventDefault();
                        this.hide();
                    }))
                }
            },

            destroy: function(){
                domConstruct.destroy(this.tooltip);
                this.inherited(arguments);
            },

            _setTitleAttr: function(value){
                this.titleNode.innerHTML = value;
            },

            _getTitleAttr: function(){
                return this.titleNode.innerHTML;
            },

            _show: function(){
                domConstruct.place(this.tooltip, document.body, 'last');
                domClass.remove(this.tooltip, 'hidden');
                domClass.add(this.tooltip, 'in ' + this.placement);
                this._position();

                //make sure tooltip gets hidden if target is disabled
                this._observer = new MutationObserver(lang.hitch(this, function(){
                    if (this.target.hasAttribute('disabled')){
                        this.hide();
                        this._observer.disconnect();
                    }
                }))
                this._observer.observe(this.target, {attributes: true});
            },

            _hide: function(){
                domClass.remove(this.tooltip, 'in top bottom left right');
                domClass.add(this.tooltip, 'hidden');
            },

            _position: function() {
                var targetPos = domGeom.position(this.target, true),
                    tooltipPos = domGeom.position(this.tooltip, true),
                    left,
                    top;

                switch (this.placement){
                    case 'left':
                    case 'right':
                        top = targetPos.y + targetPos.h /2 - tooltipPos.h /2;
                        break;
                    case 'top':
                        top = targetPos.y - tooltipPos.h;
                        break;
                    case 'bottom':
                        top = targetPos.y + targetPos.h;
                        break;
                }
                this.tooltip.style.top = top + 'px';

                switch (this.placement){
                    case 'left':
                        left = targetPos.x - tooltipPos.w;
                        break;
                    case 'right':
                        left = targetPos.x + targetPos.w;
                        break;
                    case 'top':
                    case 'bottom':
                        left = targetPos.x + targetPos.w / 2 - tooltipPos.w / 2;
                        break;
                }
                this.tooltip.style.left = left + 'px';
            }
        }
    );
});
