define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    '../widget/DropdownToggle',
    './TextBox',
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
    when,
    DropdownToggle,
    TextBox,
    WidgetsInTemplateMixin,
    DropdownMixin,
    StoreMixin,
    template
){
    return declare(
        [DropdownToggle, TextBox, WidgetsInTemplateMixin, DropdownMixin, StoreMixin],
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
            },

            _setValueAttr: function(value){

                if (value.length < this.minLength){
                    this.hide();
                } else {
                    var re = new RegExp(value, 'ig');
                    this.dropdown.re = re;
                    this.set('query', {text: re});

                    this.dropdown.refresh().then(lang.hitch(this, function(){
                        if (this.dropdown.containerNode.children.length > 0){
                            this.show();
                        } else {
                            this.hide();
                        }
                    }))
                }

                when(this.get('store'), lang.hitch(this, function(store){
                    when(store.get(value), lang.hitch(this, function(item){
                        if (item) {
                            this.input.value = item.text;
                            this.hide();
                        } else {
                            this.input.value = value;
                        }
                    }))
                }))

                this._set('value', value);
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
