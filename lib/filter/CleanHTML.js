define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './Base'
],
function(
    declare,
    lang,
    Base
){
    // module:
    //		havok/filter/CleanHTML

    return declare(
        [Base],
        {
            // summary:
            //		Filter that will remove leading and trailing whitespace

            filter: function(value){
                if (typeof value == 'string'){
                    return lang.trim(value.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, ''));
                }
                return value;
            }
        }
    );
});
