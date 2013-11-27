define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    './NavTab',
    './_SortableMixin',
    './_WidgetBase'
],
function (
    declare,
    lang,
    domConstruct,
    domClass,
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

            // placement: String
            //      Sets which side of the tab container the tabs should be shown.
            //      Possible values are `top | bottom | left | right`.
            //      Default value is `top`.
            placement: 'top',

            // templateString: String
            templateString: '<div class="tabbable"><div class="tab-content" data-dojo-attach-point="containerNode"></div></div>',

            buildRendering: function(){
                this.inherited(arguments);

                this.nav = new (declare([NavTab, SortableMixin], null));

                var nodes = this.containerNode.querySelectorAll('section'),
                    i;
                for (i = 0; i < nodes.length; i++){
                    if (nodes[i].parentNode == this.containerNode){
                        this._renderItem(nodes[i], 'tab' + i);
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
                srcHeader = srcNode.querySelector('header');
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
                    domClass.remove(this.containerNode.querySelector('[data-tab-id=' + oldValue.getAttribute('data-tab-target') + ']'), 'active');
                    domClass.add(this.containerNode.querySelector('[data-tab-id=' + newValue.getAttribute('data-tab-target') + ']'), 'active');
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
