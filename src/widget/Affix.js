define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    './_AffixMixin'
],
function(
    declare,
    WidgetBase,
    AffixMixin
) {
    // module:
    //		havok/widget/_AffixMixin

    return declare(
        [WidgetBase, AffixMixin],
        {
            // summary:
            //		A widget fixed in the viewport

            _setTargetAttr: function(/*String|DomNode|Boolean*/value){
                this.set('affix', value);
            }
        }
    );
});