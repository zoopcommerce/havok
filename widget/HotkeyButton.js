define([
    'dojo/_base/declare',
    './_ButtonBase',
    './_HotkeyMixin'
],
function (
    declare,
    ButtonBase,
    HotkeyMixin
){
    // module:
    //    	havok/widget/HotkeyButton

    return declare(
        [ButtonBase, HotkeyMixin],
        {
        }
    );
});
