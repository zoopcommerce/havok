define([
    'dojo/_base/declare',
    'dojo/dom-class',
    '../widget/_WidgetBase',
    './_FormWidgetMixin',
    'dojo/text!./template/Checkbox.html',
    '../less!./less/checkbox.less'
],
function(
    declare,
    domClass,
    WidgetBase,
    FormWidgetMixin,
    template
){
    // module:
    //		havok/form/Checkbox

    return declare
    (
        [WidgetBase, FormWidgetMixin],
        {
            // summary:
            //      Creates a nicely style checkbox input.

            // templateString: String
            templateString: template,

            buildRendering: function(){
                if (this.srcNodeRef.hasAttribute('checked')) {
                    this.value = true;
                } else {
                    this.value = false;
                }

                if (this.srcNodeRef.hasAttribute('disabled')) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }

                this.inherited(arguments);
            },

            startup: function() {
                this.inherited(arguments);
                this.set('value', this.value);
                this.set('disabled', this.disabled);
            },

            toggle: function() {
                this.set('value', !this.value);
            },

            onClick: function(){
                if (!this.get('disabled')) this.toggle();
            },

            _setValueAttr: function(value) {
                if (this._started) {
                    if (value) {
                        this.input.checked = true;
                        domClass.add(this.checkbox, 'checked');
                    } else {
                        this.input.checked = false;
                        domClass.remove(this.checkbox, 'checked');
                    }
                }
                this._set('value', value);
            },

            _setDisabledAttr: function(value) {
                if (this._started) {
                    if (value) {
                        domClass.add(this.checkbox, 'disabled');
                    } else {
                        domClass.remove(this.checkbox, 'disabled');
                    }
                }
                this._set('disabled', value);
            }
        }
    );
});
