define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dijit/a11yclick',
    './_ButtonBase'
],
function (
    declare,
    lang,
    domClass,
    a11yclick,
    ButtonBase
){
    // module:
    //    	havok/widget/ToggleButton

    return declare(
        [ButtonBase],
        {

            startup: function(){
                this.on(a11yclick.click, lang.hitch(this, 'toggle'));
                this.inherited(arguments);
            },

            toggle: function(){
                this.set('active', !this.get('active'));
            },

            _setActiveAttr: function(value){
                if (value){
                    domClass.add(this.button, 'active');
                } else {
                    domClass.remove(this.button, 'active');
                }
                this._set('active', value);
            }
        }
    );
});
