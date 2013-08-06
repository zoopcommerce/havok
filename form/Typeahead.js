define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    './ValidationTextbox',
    'dijit/_WidgetsInTemplateMixin',
    './_DropdownMixin',
    'dojo/text!./template/Typeahead.html',
    '../widget/DropdownToggle',
    './TypeaheadDropdown'
],
function (
    declare,
    lang,
    when,
    ValidationTextbox,
    WidgetsInTemplateMixin,
    DropdownMixin,
    template
){
    return declare(
        [ValidationTextbox, WidgetsInTemplateMixin, DropdownMixin],
        {
            templateString: template,

            maxItems: 8,

            minLength: 1,

            _setMaxItemsAttr: function(value){
                this.dropdown.set('queryOptions', lang.mixin(this.dropdown.get('queryOptions'), {count: value}));
                this._set('maxItems', value);
            },

//            _setValueAttr: function(value){
//                this._set('value', value);
//            },

            startup: function(){
                this.inherited(arguments);
                this.watch('value', lang.hitch(this, '_valueWatcher'));
            },

            _valueWatcher: function(property, oldValue, newValue){
                if (newValue.length < this.minLength){
                    this.dropdownToggle.hide();
                    return;
                }

                var re = new RegExp(newValue, 'ig');
                this.dropdown.re = re;
                this.set('query', {text: re});
                this.dropdown.set('queryOptions', lang.mixin(this.dropdown.get('queryOptions'), {sort: function(a, b){
                    var aIndex,
                        bIndex;

                    re.lastIndex = 0;
                    re.test(a.text);
                    aIndex = re.lastIndex;

                    re.lastIndex = 0;
                    re.test(b.text);
                    bIndex = re.lastIndex;
                    return aIndex == bIndex ? 0 : aIndex > bIndex ? 1 : -1;
                }}));

                when(
                    this.dropdown.refresh(),
                    lang.hitch(this, function(){
                        this.dropdownToggle.show();
                    })
                );
            }
        }
    );
});
