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

                this.nav = declare.safeMixin(new NavTab, new SortableMixin);
            },

            startup: function(){
                this.inherited(arguments);

                var i,
                    type,
                    navData = [],
                    active;

                if (!this.tabPanes){
                    this.tabPanes = {};
                    for (i = 0; i < this.containerNode.children.length; i++){
                        this.tabPanes[domAttr.get(this.containerNode.children[i], 'title')] = this.containerNode.children[i];
                        domClass.add(this.containerNode.children[i], 'tab-pane');
                    }
                }

                for (i in this.tabPanes){
                    if (domClass.contains(this.tabPanes[i], 'active')){
                        active = i;
                    }
                    type = 'link';
                    if (domClass.contains(this.tabPanes[i], 'disabled')){
                        type = 'disabled';
                    }
                    navData.push({type: type, text: i});
                }

                this.nav.set('store', {idProperty: 'text', data: navData});
                this.nav.set('active', active);
                this.nav.watch('active', lang.hitch(this, function(property, oldValue, newValue){
                    domClass.remove(this.tabPanes[oldValue.text], 'active');
                    domClass.add(this.tabPanes[newValue.text], 'active');
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
