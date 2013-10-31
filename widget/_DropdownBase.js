define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    './_WidgetBase',
    '../less!./less/dropdowns.less'
],
function (
    declare,
    lang,
    on,
    WidgetBase
){
    // module:
    //    	havok/widget/_DropdownBase

    return declare(
        [WidgetBase],
        {

            //This is a really basic empty dropdown.
            //

            baseClass: 'dropdown-menu',

            templateString: '<span data-dojo-attach-point="containerNode"></span>',

            startup: function(){
                this.inherited(arguments);

                on(this.containerNode, 'mouseenter', lang.hitch(this, 'onMouseenter'));
                on(this.containerNode, 'mouseleave', lang.hitch(this, 'onMouseleave'));

                var i,
                    children = this.getChildren();
                for (i = 0; i < children.length; i++){
                    this.watchChildHasMouse(children[i]);
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

            watchChildHasMouse: function(childWidget){
                childWidget.watch('hasMouse', lang.hitch(this, function(property, oldValue, newValue){
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
                }));
            }
        }
    );
});
