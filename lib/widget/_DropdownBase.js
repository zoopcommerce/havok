define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-class',
    './_WidgetBase',
    './_HideableMixin',
    '../less!./less/dropdowns.less'
],
function (
    declare,
    lang,
    on,
    domClass,
    WidgetBase,
    HideableMixin
){
    // module:
    //    	havok/widget/_DropdownBase

    return declare(
        [WidgetBase, HideableMixin],
        {
            // summary:
            //      A base class for dropdown widgets to inherit from.
            // description:
            //      Mostly handles mouse events for dropdowns.

            // baseClass: String
            baseClass: 'dropdown-menu',

            // tag: String
            tag: 'span',

            startup: function(){
                this.inherited(arguments);

                this.addHandler(on(this.domNode, 'mouseenter', lang.hitch(this, 'onMouseenter')), 'dropdown');
                this.addHandler(on(this.domNode, 'mouseleave', lang.hitch(this, 'onMouseleave')), 'dropdown');

                var i,
                    children = this.getChildren();
                for (i = 0; i < children.length; i++){
                    this._watchChildHasMouse(children[i]);
                }
            },

            onMouseenter: function(){
                this.set('hasMouse', true);
                this.set('_primaryHasMouse', true);
            },

            onMouseleave: function(){
                this.set('_primaryHasMouse', false);
                setTimeout(lang.hitch(this, function(){
                    if (!this.childHasMouse){
                        this.set('hasMouse', false);
                    }
                }), 50);
            },

            _watchChildHasMouse: function(/*havok/widget/_DropdownBase*/childWidget){
                this.addHandler(childWidget.watch('hasMouse', lang.hitch(this, function(property, oldValue, newValue){
                    if (newValue){
                        this.set('childHasMouse', childWidget);
                    } else {
                        this.set('childHasMouse', false);
                    }
                    if (!newValue){
                        setTimeout(lang.hitch(this, function(){
                            if (!this._primaryHasMouse){
                                this.set('hasMouse', false);
                            }
                        }), 50);
                    }
                })), 'dropdown');
            },

            _show: function(){
                domClass.remove(this.domNode, 'hidden');
            },

            _hide: function(){
                domClass.add(this.domNode, 'hidden');
            }
        }
    );
});
