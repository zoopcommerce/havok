define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/a11yclick',
    '../cssfx',
    './_WidgetBase',
    '../less!./less/navbar.less'
],
function (
    declare,
    lang,
    on,
    domConstruct,
    domClass,
    a11yclick,
    cssfx,
    WidgetBase
){
    // module:
    //    	havok/widget/NavBar

    return declare(
        [WidgetBase],
        {
            // summary:
            //      Navigation bar

            /*=====
            // toggleNode: DomNode
            //      The dom node used to toggle a collapsed nav bar.
            toggleNode: undefined,
            =====*/

            /*=====
            // toggleTarget: DomNode
            //      The dom node that to show/hide when using a collapsable nav bar.
            toggleTarget: undefined,
            =====*/

            // baseClass: String
            baseClass: 'navbar',

            // templateString: String
            templateString: '<div><div class="navbar-inner" data-dojo-attach-point="containerNode"></div></div>',

            startup: function(){
                this.inherited(arguments);

                this.toggleNode = this.containerNode.querySelector('[data-havok-nav-bar-toggle]');
                this.toggleTarget = this.containerNode.querySelector('[data-havok-nav-bar-toggle-target]');

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

            toggle: function(/*Event?*/e){

                if (e) e.preventDefault();

                var toggleTarget = this.toggleTarget;

                if (domClass.contains(this.toggleTarget, 'in')){
                    domClass.remove(this.toggleTarget, 'in');
                    toggleTarget.style['height'] = this.toggleTargetInner.scrollHeight + 'px';
                    setTimeout(function(){ //this brief delay is required to allow the style to switch from auto to an explicit number. Without the delay, the css transition may not fire.
                        toggleTarget.style['height'] = '0';
                    }, 20);
                } else {
                    on.once(toggleTarget, cssfx.transitionEndEvent(), lang.hitch(this, function(){
                        toggleTarget.style['height'] = 'auto';
                    }));
                    toggleTarget.style['height'] = this.toggleTargetInner.scrollHeight + 'px';
                    domClass.add(this.toggleTarget, 'in');
                }
            }
        }
    );
});
