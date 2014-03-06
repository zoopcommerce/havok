define([
    'dojo/_base/declare',
    'dojo/dom-class',
    './ButtonGroup'
],
function (
    declare,
    domClass,
    ButtonGroup
){
    // module:
    //    	havok/widget/RadioButtonGroup

    return declare(
        [ButtonGroup],
        {
            // summary:
            //      Creates a button group that toggle radio button style

            _setActiveAttr: function(/*DomNode*/value){
                if (this.active && this.active.nodeType){
                    domClass.remove(this.active, 'active');
                }
                if (value && value.nodeType){
                    domClass.add(value, 'active');
                }
                this._set('active', value);
            }
        }
    );
});
