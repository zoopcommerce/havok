define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    './ButtonGroup'
],
function (
    declare,
    lang,
    domClass,
    ButtonGroup
){
    // module:
    //    	havok/widget/CheckboxButtonGroup

    return declare(
        [ButtonGroup],
        {
            // summary:
            //      Creates a button group that toggle checkbox style

            // storeAdapter: String
            //      Module Id for use with the _StoreMixin
            storeAdapter: './_CheckboxButtonGroupStoreAdapterMixin',

            _setActiveAttr: function(/*DomNode|DomNode[]?*/value){

                var i,
                    node;

                if (!value){
                    //deactivate all
                    for (i = 0; i < this.containerNode.children.length; i++){
                        domClass.remove(this.containerNode.children[i], 'active');
                    }
                    this._set('active', null);
                    return;
                }
                if (lang.isArray(value)){
                    //active only those in array
                    for (i = 0; i < this.containerNode.children.length; i++){
                        node = this.containerNode.children[i];
                        if (value.indexOf(node) == -1){
                            domClass.remove(node, 'active');
                        } else {
                            domClass.add(node, 'active');
                        }
                    }
                    this._set('active', value);
                    return;
                }

                //otherwise, toggle value in the active array
                var newActive;
                if (!this.active){
                    domClass.add(value, 'active');
                    newActive = [value];
                } else if (this.active.indexOf(value) == -1){
                    domClass.add(value, 'active');
                    newActive = this.active.slice();
                    newActive.push(value);
                } else {
                    domClass.remove(value, 'active');
                    newActive = this.active.slice();
                    newActive.splice(this.active.indexOf(value), 1);
                }
                this._set('active', newActive);
            }
        }
    );
});
