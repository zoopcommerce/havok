define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/a11yclick',
    '../cssfx',
    './_WidgetBase',
    '../less!./less/accordion.less'
],
function (
    declare,
    array,
    lang,
    on,
    domClass,
    domConstruct,
    a11yclick,
    cssfx,
    WidgetBase
){
    // module:
    //    	havok/widget/Accordion

    return declare(
        [WidgetBase],
        {
            tag: 'div',

            baseClass: 'accordion',

            buildRendering: function(){
                this.inherited(arguments);

                array.forEach(this.containerNode.children, lang.hitch(this, function(node){
                    this._renderItem(node);
                }));
            },

            _renderItem: function(srcNode){
                var heading,
                    body;

                domClass.add(srcNode, 'accordion-group');
                heading = domConstruct.place('<div class="accordion-heading"><a class="accordion-toggle"></a></div>', srcNode);
                domConstruct.place(srcNode.firstElementChild, heading.firstElementChild);

                body = domConstruct.place('<div class="accordion-body"><div class="accordion-inner"></div></div>', srcNode);
                domConstruct.place(srcNode.firstElementChild, body.firstElementChild);

                on(heading, a11yclick.click, lang.hitch(this, function(e){
                    e.preventDefault();
                    this.toggle(srcNode);
                }))
            },

            toggle: function(node){
                var body = node.querySelector('.accordion-body'),
                    nodes,
                    i;

                if (domClass.contains(node, 'open')){
                    domClass.remove(node, 'open');
                    body.style['height'] = body.scrollHeight + 'px';
                    setTimeout(function(){ //this brief delay is required to allow the style to switch from auto to an explicit number. Without the delay, the css transition may not fire.
                        body.style['height'] = '0';
                    }, 20);
                } else {
                    nodes = this.domNode.querySelectorAll('.accordion-group.open');
                    for(i=0; i<nodes.length; i++){
                        this.toggle(nodes[i]);
                    }
                    domClass.add(node, 'open');
                    body.style['height'] = body.scrollHeight + 'px';
                    on.once(body, cssfx.transitionEndEvent(), lang.hitch(this, function(){
                        body.style['height'] = 'auto';
                    }));
                }
            }
        }
    );
});
