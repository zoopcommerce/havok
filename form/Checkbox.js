define([
    'dojo/_base/declare',
    'dojo/dom-attr',
    'dojo/dom-class',
    '../widget/_WidgetBase',
    './_FormWidgetMixin',
    'dojo/text!./template/Checkbox.html',
    '../less!./less/checkbox.less'
],
function(
    declare,
    domAttr,
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
            templateString: template,

            buildRendering: function(){
                if (domAttr.has(this.srcNodeRef, 'checked')) {
                    this.value = true;
                } else {
                    this.value = false;
                }

                if (domAttr.has(this.srcNodeRef, 'disabled')) {
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
                if (!this.get('disabled')) {
                    this.toggle();
                }
            },

            _setValueAttr: function(value) {
                if (this._started) {
                    if (value) {
                        this.input.checked = false;
                        domClass.remove(this.checkbox, 'checked');
                    } else {
                        this.input.checked = true;
                        domClass.add(this.checkbox, 'checked');
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
