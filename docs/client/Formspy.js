define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/json',
    'havok/widget/_WidgetBase',
    'dojo/text!./template/Formspy.html'
],
function (
    declare,
    lang,
    json,
    WidgetBase,
    template
){
    // module:
    //    	docs/Formspy

    return declare(
        [WidgetBase],
        {
            baseClass: 'form-horizontal',

            templateString: template,

            startup: function(){

                var target = this.getChildren()[0];

                this.state.innerHTML = target.get('state');
                target.watch('state', lang.hitch(this, function(property, oldValue, newValue){
                    this.state.textContent = newValue;
                }));

                var showValue = lang.hitch(this, function(value){
                    if (typeof value == 'string'){
                        this.value.textContent = value;
                    } else {
                        this.value.innerHTML = json.stringify(value, null, '   ');
                    }
                })

                showValue(target.get('value'));
                target.watch('value', lang.hitch(this, function(property, oldValue, newValue){
                    showValue(newValue);
                }));
            }
        }
    );
});
