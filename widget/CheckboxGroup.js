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
    //    	havok/widget/CheckboxGroup

    return declare(
        [ButtonGroup],
        {
            _setActiveAttr: function(value){

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
                if (!this.active){
                    this.active = [];
                }
                if (this.active.indexOf(value) == -1){
                    domClass.add(value, 'active');
                    this.active.push(value);
                } else {
                    domClass.remove(value, 'active');
                    this.active.splice(this.active.indexOf(value), 1);
                }
                this._set('active', this.active);
            }
        }
    );
});
