define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-class',
    'havok/widget/CheckboxButtonGroup'
],
function (
    declare,
    dom,
    domClass,
    CheckboxButtonGroup
){
    // module:
    //    	docs/ScopeToggle

    return declare(
        [CheckboxButtonGroup],
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

                    nodes = mainContent.querySelectorAll('section.private.inherited');
                    for(i=0; i < nodes.length; i++){
                       domClass[both](nodes[i], 'hide');
                    }
                    nodes = mainContent.querySelectorAll('section.private:not(.inherited)');
                    for(i=0; i < nodes.length; i++){
                       domClass[privateOnly](nodes[i], 'hide');
                    }
                    nodes = mainContent.querySelectorAll('section:not(.private).inherited');
                    for(i=0; i < nodes.length; i++){
                       domClass[inheritedOnly](nodes[i], 'hide');
                    }
                });
            }
        }
    );
});
