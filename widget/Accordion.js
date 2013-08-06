define([
    'dojo/_base/declare',
    'dojo/_base/fx',
    'dojo/fx',
    'dojo/fx/easing',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/string',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dijit/a11yclick',
    './_WidgetBase',
    'dojo/text!./template/Accordion.html',
    'dojo/text!./template/AccordionItem.html',
    '../less!../vendor/bootstrap/less/accordion.less',
    '../less!../vendor/bootstrap/less/component-animations.less'
],
function (
    declare,
    baseFx,
    fx,
    easing,
    array,
    lang,
    on,
    string,
    query,
    domAttr,
    domConstruct,
    domGeom,
    a11yclick,
    WidgetBase,
    template,
    itemTemplate
){
    // module:
    //    	havok/widget/Accordion

    return declare(
        [WidgetBase],
        {
            templateString: template,

            itemTemplate: itemTemplate,

            //items: {},

            buildRendering: function(){
                this.inherited(arguments);

                this.items = [];
                array.forEach(this.containerNode.children, lang.hitch(this, function(node){
                    if (node.title){
                        this._renderItem(node);
                    }
                }));
            },

            startup: function(){
                this.inherited(arguments);
                this._toggleItem(this.items[0]);
            },

            _renderItem: function(srcNode){
                var title = srcNode.title,
                    item;

                domConstruct.place(string.substitute(this.itemTemplate, {title: title}), srcNode, 'after');
                item = {domNode: srcNode.nextElementSibling};
                query('[data-dojo-attach-point]', item.domNode).forEach(function(attachNode){
                        item[domAttr.get(attachNode, 'data-dojo-attach-point')] = attachNode;
                });
                domConstruct.place(srcNode, item.containerNode);
                this.items.push(item);

                on(item.toggle, a11yclick.click, lang.hitch(this, function(e){
                    e.preventDefault();
                    this._toggleItem(item);
                }))
            },

            _toggleItem: function(item){
                var toggleFx = [];
                array.forEach(this.items, lang.hitch(this, function(accItem){
                    if (accItem.open){
                        toggleFx.push(this._getToggleFx(accItem));
                    }
                }));
                toggleFx.push(this._getToggleFx(item));
                fx.combine(toggleFx).play();
            },

            _getToggleFx: function(item){
                var height = domGeom.position(item.body).h,
                    containerNodeHeight = domGeom.position(item.containerNode).h;

                if (height > 0){
                    item.open = false;
                    return baseFx.animateProperty({
                        node: item.body,
                        properties: {
                            height: 0
                        },
                        easing: easing.quartInOut
                    });
                } else {
                    item.open = true;
                    return baseFx.animateProperty({
                        node: item.body,
                        properties: {
                            height: containerNodeHeight
                        },
                        easing: easing.quartInOut
                    });
                }
            }
        }
    );
});
