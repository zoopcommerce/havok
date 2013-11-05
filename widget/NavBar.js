define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/fx',
    'dojo/fx/easing',
    'dojo/on',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dijit/a11yclick',
    './_WidgetBase',
    '../less!../vendor/bootstrap/less/navbar.less'
],
function (
    declare,
    lang,
    baseFx,
    easing,
    on,
    domAttr,
    domConstruct,
    domClass,
    domStyle,
    domGeom,
    a11yclick,
    WidgetBase
){
    // module:
    //    	havok/widget/NavBar

    return declare(
        [WidgetBase],
        {
            //toggleNode: undefined,

            //toggleTarget: undefined,

            baseClass: 'navbar',

            templateString: '<div><div class="navbar-inner" data-dojo-attach-point="containerNode"></div></div>',

            startup: function(){
                this.inherited(arguments);

                var i,
                    node;

                for (i = 0; i < this.containerNode.children.length; i++){
                    node = this.containerNode.children[i];
                    if (domAttr.has(node, 'data-havok-nav-bar-toggle')){
                        this.toggleNode = node;
                    }
                    if (domAttr.has(node, 'data-havok-nav-bar-toggle-target')){
                        this.toggleTarget = node;
                    }
                }

                if (this.toggleNode){
                    domClass.add(this.toggleNode, 'btn btn-navbar');
                    on(this.toggleNode, a11yclick.click, lang.hitch(this, 'toggle'));
                }
                if (this.toggleTarget){
                    this.toggleTargetInner = domConstruct.create('div');
                    while (this.toggleTarget.children.length > 0){
                        domConstruct.place(this.toggleTarget.children[0], this.toggleTargetInner);
                    }
                    domConstruct.place(this.toggleTargetInner, this.toggleTarget, 'only');
                    domClass.add(this.toggleTarget, 'nav-collapse collapse');
                }
            },

            toggle: function(e){
                e.preventDefault();

                var height,
                    opening;

                if (domClass.contains(this.toggleTarget, 'in')){
                    height = 0;
                    domClass.remove(this.toggleTarget, 'in');
                } else {
                    opening = true;
                    height = domGeom.position(this.toggleTargetInner).h + 10;
                    domClass.add(this.toggleTarget, 'in');
                }

                baseFx.animateProperty({
                    node: this.toggleTarget,
                    properties: {
                        height: height
                    },
                    easing: easing.quartInOut,
                    onEnd: lang.hitch(this, function(){
                        if (opening){
                            setTimeout(lang.hitch(this, function(){
                                domStyle.set(this.toggleTarget, 'height', 'auto');
                            }), 50);
                        }
                    })
                }).play();
            }
        }
    );

});
