define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-class',
    '../../widget/CheckboxGroup'
],
function (
    declare,
    dom,
    domClass,
    CheckboxGroup
){
    // module:
    //    	havok/docs/module/Formspy

    return declare(
        [CheckboxGroup],
        {

            startup: function(){

                this.watch('active', function(p, o, n){

                    var privateOnly = 'add',
                        inheritedOnly = 'add',
                        both = 'add',
                        nodes,
                        mainContent = dom.byId('mainContent'),
                        i;

                    if (n.indexOf(this.containerNode.firstElementChild) != -1){
                        privateOnly = 'remove';
                    }
                    if (n.indexOf(this.containerNode.lastElementChild) != -1){
                        inheritedOnly = 'remove';
                    }
                    if (privateOnly == 'remove' && inheritedOnly == 'remove'){
                        both = 'remove';
                    }

                    nodes = mainContent.querySelectorAll('div.private.inherited');
                    for(i=0; i < nodes.length; i++){
                       domClass[both](nodes[i], 'hide');
                    }
                    nodes = mainContent.querySelectorAll('div.private:not(.inherited)');
                    for(i=0; i < nodes.length; i++){
                       domClass[privateOnly](nodes[i], 'hide');
                    }
                    nodes = mainContent.querySelectorAll('div:not(.private).inherited');
                    for(i=0; i < nodes.length; i++){
                       domClass[inheritedOnly](nodes[i], 'hide');
                    }
                });
            }
        }
    );
});
