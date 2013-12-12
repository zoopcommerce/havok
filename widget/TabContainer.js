define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/registry',
    './NavTab',
    './_SortableMixin',
    './_WidgetBase'
],
function (
    contextRequire,
    declare,
    lang,
    domConstruct,
    domClass,
    registry,
    NavTab,
    SortableMixin,
    WidgetBase
){
    // module:
    //    	havok/widget/TabContainer

    return declare(
        [WidgetBase],
        {
            // summary:
            //      Simple tab pane container widget.
            // description:
            //		Each `section` tag in the containerNode is an item in the tab container.
            //		If there is a `header` tag inside a section, the contents of that `header` tag
            //		are used for the item's tab.

            contextRequire: contextRequire,

            // placement: String
            //      Sets which side of the tab container the tabs should be shown.
            //      Possible values are `top | bottom | left | right`.
            //      Default value is `top`.
            placement: 'top',

            // templateString: String
            templateString: '<div class="tabbable"><div class="tab-content" data-dojo-attach-point="containerNode"></div></div>',

            buildRendering: function(){
                var rendered = this._rendered,
                    i;

                this.inherited(arguments);

                if (!rendered){
                    this.nav = new (declare([NavTab, SortableMixin], null));
                    this.nav.domNode.setAttribute('data-havok-navtab', '');
                    var nodes = this.containerNode.querySelectorAll('SECTION');
                    for (i = 0; i < nodes.length; i++){
                        if (nodes[i].parentNode == this.containerNode){
                            this._renderItem(nodes[i], 'tab' + i);
                        }
                    }
                } else {
                    for(i = 0; i < this.domNode.children.length; i++){
                        if (this.domNode.children[i].hasAttribute('data-havok-navtab')){
                            this.nav = registry.getEnclosingWidget(this.domNode.children[i]);
                            break;
                        }
                    }
                }
            },

            _renderItem: function(/*DomNode*/srcNode, /*String*/id){
                // summary:
                //      Render a node as and tab item

                var heading,
                    srcHeader,
                    classes = [];

                if (domClass.contains(srcNode, 'active')){
                    classes.push('active');
                }
                if (domClass.contains(srcNode, 'disabled')){
                    classes.push = 'disabled';
                }

                //extract header
                heading = domConstruct.create('li', {'data-tab-target': id, 'class': classes.join(' '), innerHTML: '<a href=""></a>'});
                srcHeader = srcNode.querySelector('HEADER');
                if (srcHeader) {
                    while (srcHeader.childNodes.length > 0){
                        domConstruct.place(srcHeader.childNodes[0], heading.firstElementChild);
                    }
                    domConstruct.destroy(srcHeader);
                }
                this.nav.addItem(heading);
                domClass.add(srcNode, 'tab-pane');
                srcNode.setAttribute('data-tab-id', id);
            },

            startup: function(){

                this.inherited(arguments);

                this.nav.watch('active', lang.hitch(this, function(property, oldValue, newValue){
                    if (oldValue) domClass.remove(this.containerNode.querySelector('[data-tab-id=' + oldValue.getAttribute('data-tab-target') + ']'), 'active');
                    if (newValue) domClass.add(this.containerNode.querySelector('[data-tab-id=' + newValue.getAttribute('data-tab-target') + ']'), 'active');
                }));
                this.nav.startup();
            },

            _setPlacementAttr: function(/*String*/value){

                domClass.remove(this.domNode, 'tabs-left tabs-right tabs-below');
                switch (value){
                    case 'left':
                        domClass.add(this.domNode, 'tabs-left');
                        domConstruct.place(this.nav.domNode, this.containerNode, 'before');
                        break;
                    case 'right':
                        domClass.add(this.domNode, 'tabs-right');
                        domConstruct.place(this.nav.domNode, this.containerNode, 'before');
                        break;
                    case 'top':
                        domConstruct.place(this.nav.domNode, this.containerNode, 'before');
                        break;
                    case 'bottom':
                        domClass.add(this.domNode, 'tabs-below');
                        domConstruct.place(this.nav.domNode, this.containerNode, 'after');
                }
                this._set('placement', value);
            }
        }
    );
});
