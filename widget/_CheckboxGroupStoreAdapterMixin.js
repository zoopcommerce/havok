define([
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (
    declare,
    lang
){
    return declare(
        [],
        {
            _setActiveAttr: function(value){
                if (!this._nodesRendered) {
                    this.active = value;
                    return;
                }

                var i,
                    nodes,
                    active;

                if (typeof value == 'string'){
                    nodes = this.containerNode.querySelectorAll('[data-havok-store-id=' + value + ']');
                    if (nodes.length > 0){
                        value = nodes[0];
                    }
                } else if (lang.isArray(value) && value.length > 0 && typeof value[0] == 'string'){
                    active = [];
                    for(i = 0; i < value.length; i++){
                        nodes = this.containerNode.querySelectorAll('[data-havok-store-id=' + value[i] + ']');
                        if (nodes.length > 0){
                            active.push(nodes[0]);
                        }
                    }
                    value = active;
                }
                this.inherited(arguments, [value]);
            }
        }
    );
});
