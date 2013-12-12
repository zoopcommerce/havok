define([
    'require',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    './_AffixMixin'
],
function(
    contextRequire,
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

            contextRequire: contextRequire
        }
    );
});