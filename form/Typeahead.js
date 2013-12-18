define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './ValidationTextBox',
    '../widget/_WidgetsInTemplateMixin',
    './_DropdownMixin',
    '../widget/_StoreMixin',
    'dojo/text!./template/Typeahead.html',
    '../widget/DropdownToggle',
    './TypeaheadDropdown'
],
function (
    declare,
    lang,
    ValidationTextBox,
    WidgetsInTemplateMixin,
    DropdownMixin,
    StoreMixin,
    template
){
    return declare(
        [ValidationTextBox, WidgetsInTemplateMixin, DropdownMixin, StoreMixin],
        {
            templateString: template,

            maxItems: 8,

            minLength: 1,

            buildRendering: function(){
                this.inherited(arguments);
                this.dropdown.storeHost = this;
            },

            startup: function(){
                this.inherited(arguments);
                this.watch('value', lang.hitch(this, function(property, oldValue, newValue){
                    if (newValue.length < this.minLength){
                        this.dropdownToggle.hide();
                        return;
                    }

                    var re = new RegExp(newValue, 'ig');
                    this.dropdown.re = re;
                    this.set('query', {text: re});

                    this.dropdown.refresh().then(lang.hitch(this, function(){
                        if (this.dropdown.containerNode.children.length > 0){
                            this.dropdownToggle.show();
                        } else {
                            this.dropdownToggle.hide();
                        }
                    }))
                }));
            },

            _getQueryOptionsAttr: function(){
                var re = this.dropdown.re;

                return lang.mixin({
                    count: this.maxItems,
                    sort: function(a, b){
                        var aIndex,
                            bIndex;

                        re.lastIndex = 0;
                        re.test(a.text);
                        aIndex = re.lastIndex;

                        re.lastIndex = 0;
                        re.test(b.text);
                        bIndex = re.lastIndex;
                        return aIndex == bIndex ? 0 : aIndex > bIndex ? 1 : -1;
                    }
                }, this.queryOptions);
            }
        }
    );
});
