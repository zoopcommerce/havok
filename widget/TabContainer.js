define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-attr',
    './NavTab',
    './_SortableMixin',
    './_WidgetBase',
    'dojo/text!./template/TabContainer.html'
],
function (
    declare,
    lang,
    domConstruct,
    domClass,
    domAttr,
    NavTab,
    SortableMixin,
    WidgetBase,
    template
){
    // module:
    //    	havok/widget/TabContainer

    return declare(
        [WidgetBase],
        {

            placement: 'top', // top | bottom | left | right

            templateString: template,

            buildRendering: function(){

                this.inherited(arguments);

                this.nav = new (declare([NavTab, SortableMixin], null));
            },

            startup: function(){
                this.inherited(arguments);

                var i,
                    classes;

                if (!this.tabPanes){
                    this.tabPanes = {};
                    for (i = 0; i < this.containerNode.children.length; i++){
                        this.tabPanes[domAttr.get(this.containerNode.children[i], 'title')] = this.containerNode.children[i];
                        domClass.add(this.containerNode.children[i], 'tab-pane');
                    }
                }

                for (i in this.tabPanes){
                    classes = [];
                    if (domClass.contains(this.tabPanes[i], 'active')){
                        classes.push('active');
                    }
                    if (domClass.contains(this.tabPanes[i], 'disabled')){
                        classes.push = 'disabled';
                    }
                    domAttr.set(this.nav.addItem('<a class="' + classes.join('') + '" href="">' + i + '</a>'), 'tab-id', i);
                }

                this.nav.watch('active', lang.hitch(this, function(property, oldValue, newValue){
                    domClass.remove(this.tabPanes[domAttr.get(oldValue, 'tab-id')], 'active');
                    domClass.add(this.tabPanes[domAttr.get(newValue, 'tab-id')], 'active');
                }));
                this.nav.startup();
            },

            _setPlacementAttr: function(value){
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
