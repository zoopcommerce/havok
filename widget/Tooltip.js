define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-style',
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
        domStyle,
        domConstruct,
        domClass,
        domGeom,
        WidgetBase,
        HideableMixin,
        template
        ) {
    // module:
    //		havok/widget/Tooltip

    return declare(
        [WidgetBase, HideableMixin],
        {
            templateString: template,

            eventShow: 'mouseover',

            eventHide: 'mouseout',

            //title: undefined,

            placement: 'top', //top | bottom | left | right

            hidden: true,

            //target: undefined,

            buildRendering: function(){
                if (!this.tag){
                    this.tag = 'span';
                }
                if (this.srcNodeRef){
                    this.tag = this.srcNodeRef.nodeName;
                }

                this.inherited(arguments);

                if (!this.target){
                    this.target = this.domNode;
                }
            },

            startup: function(){

                this.inherited(arguments);

                on(this.target, this.eventShow, lang.hitch(this, function(e){
                    e.preventDefault();
                    this.set('hidden', false)
                }));
                on(this.target, this.eventHide, lang.hitch(this, function(e){
                    e.preventDefault();
                    this.set('hidden', true)
                }));
            },

            _show: function(){
                domConstruct.place(this.tooltip, document.body, 'last');
                domClass.remove(this.tooltip, 'hidden');
                domClass.add(this.tooltip, 'in ' + this.placement);
                this._position();
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
                domStyle.set(this.tooltip, 'top', top + 'px');

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
                domStyle.set(this.tooltip, 'left', left + 'px');
            }
        }
    );
});
