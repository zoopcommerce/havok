define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/json',
    '../../widget/_WidgetBase',
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
    //    	havok/docs/module/Formspy

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

                this.value.innerHTML = json.stringify(target.get('value'), null, '   ');
                target.watch('value', lang.hitch(this, function(property, oldValue, newValue){
                    if (typeof newValue == 'string'){
                        this.value.textContent = newValue;
                    } else {
                        this.value.innerHTML = json.stringify(newValue, null, '   ');
                    }
                }));
            }
        }
    );
});
