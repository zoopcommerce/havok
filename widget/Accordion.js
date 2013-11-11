define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dijit/a11yclick',
    '../cssfx',
    './_WidgetBase',
    'dojo/text!./template/AccordionItem.html',
    '../less!./less/accordion.less'
],
function (
    declare,
    array,
    lang,
    on,
    string,
    domAttr,
    domConstruct,
    a11yclick,
    cssfx,
    WidgetBase,
    itemTemplate
){
    // module:
    //    	havok/widget/Accordion

    return declare(
        [WidgetBase],
        {
            tag: 'div',

            baseClass: 'accordion',

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

            _renderItem: function(srcNode){
                var title = srcNode.title,
                    item;

                domConstruct.place(string.substitute(this.itemTemplate, {title: title}), srcNode, 'after');
                item = {domNode: srcNode.nextElementSibling};
                item.body = item.domNode.lastElementChild;
                item.containerNode = item.body.firstElementChild;
                domConstruct.place(srcNode, item.containerNode);
                this.items.push(item);

                on(item.domNode.firstElementChild, a11yclick.click, lang.hitch(this, function(e){
                    e.preventDefault();
                    this._toggleItem(item);
                }))
            },

            _toggleItem: function(item){
                if (domAttr.get(item.body, 'data-havok-open')){
                    domAttr.set(item.body, 'data-havok-open', false);
                    item.body.style['height'] = item.body.scrollHeight + 'px';
                    setTimeout(function(){ //this brief delay is required to allow the style to switch from auto to an explicit number. Without the delay, the css transition may not fire.
                        item.body.style['height'] = '0';
                    }, 20);
                } else {
                    domAttr.set(item.body, 'data-havok-open', true);
                    item.body.style['height'] = item.body.scrollHeight + 'px';
                    on.once(item.body, cssfx.transitionEndEvent(), lang.hitch(this, function(){
                        item.body.style['height'] = 'auto';
                    }));
                }
            }
        }
    );
});
