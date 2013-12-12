define([
    'require',
    'dojo/_base/declare',
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
    contextRequire,
    declare,
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
            // summary:
            //      Simple accordion widget.
            // description:
            //		Each `section` tag in the containerNode is an item in the accordion.
            //		If there is a `header` tag inside a section, the contents of that `header` tag
            //		are used for the item's clickable text.

            // baseClass: [protected] String
            baseClass: 'accordion',

            /*=====
            // active: DomNode
            //      Holds a reference to the currently active accordion item.
            active: undefined,
            =====*/

            contextRequire: contextRequire,

            buildRendering: function(){

                var rendered = this._rendered;

                this.inherited(arguments);

                if (!rendered) {
                    var nodes = this.containerNode.querySelectorAll('SECTION'),
                        i;
                    for (i = 0; i < nodes.length; i++){
                        if (nodes[i].parentNode == this.containerNode){
                            this._renderItem(nodes[i]);
                        }
                    }
                }
            },

            _renderItem: function(/*DomNode*/srcNode){
                // summary:
                //      Render a node as and accordion item

                var heading,
                    srcHeader,
                    body;

                domClass.add(srcNode, 'accordion-group');

                //create header
                heading = domConstruct.place('<div class="accordion-heading"><a class="accordion-toggle"></a></div>', srcNode);
                srcHeader = srcNode.querySelector('header');
                if (srcHeader) {
                    while (srcHeader.childNodes.length > 0){
                        domConstruct.place(srcHeader.childNodes[0], heading.firstElementChild);
                    }
                    domConstruct.destroy(srcHeader);
                }

                //create body
                body = domConstruct.place('<div class="accordion-body"><div class="accordion-inner"></div></div>', srcNode);
                while (srcNode.children.length > 2){
                    domConstruct.place(srcNode.children[0], body.firstElementChild);
                }

                on(heading, a11yclick.click, lang.hitch(this, function(e){
                    e.preventDefault();
                    this.toggle(srcNode);
                }))
            },

            toggle: function(/*DomNode*/node){
                // summary:
                //      Show/hide an accordion item.
                // node:
                //      Must be the `section` node that you want to show/hide

                var close = function(nodeToClose){
                        var body = nodeToClose.lastElementChild;
                        body.style['height'] = body.scrollHeight + 'px';
                        setTimeout(function(){ //this brief delay is required to allow the style to switch from auto to an explicit number. Without the delay, the css transition may not fire.
                            body.style['height'] = '0';
                        }, 20);
                    }

                if (this.active == node){
                    delete(this.active);
                    close(node);
                } else {
                    if (this.active) close(this.active);
                    var body = node.lastElementChild;
                    on.once(body, cssfx.transitionEndEvent(), lang.hitch(this, function(){
                        body.style['height'] = 'auto';
                    }));
                    body.style['height'] = body.scrollHeight + 'px';
                    this.active = node;
                }
            }
        }
    );
});
