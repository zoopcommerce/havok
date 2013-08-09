define([
    'dojo/_base/declare',
    'dojo/on',
    'dojo/_base/lang',
    './Dragable',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dijit/registry'
],
function (
    declare,
    on,
    lang,
    Dragable,
    domConstruct,
    domStyle,
    registry
){
    // module:
    //		havok/widget/_SortableMixin

    return declare(
        [],
        {

            dropTargets: ['this'],

            _refresh: function(data){

                this.inherited(arguments);

                for (var i = 0; i < data.length; i++){
                    this._makeDragable(data[i]);
                }
            },

            _makeDragable: function(item){
                var dragable = new Dragable({}, this.nodes[item[this.store.idProperty]]);

                on(dragable.domNode, 'dragover', function(e){

                    var activeDragNode = registry.byId(e.dataTransfer.getData('application/widget')).domNode,
                        activeDragParentId = registry.getEnclosingWidget(activeDragNode.parentElement).id,
                        target = registry.getEnclosingWidget(dragable.domNode.parentElement),
                        i,
                        hasTarget;

                    for (i = 0; i < target.dropTargets.length; i++){
                        if ((target.dropTargets[i] == 'this' && activeDragParentId == target.id) ||
                             target.dropTargets[i] == activeDragParentId
                         ) {
                            hasTarget = true;
                            break;
                        }
                    }
                    if ( ! hasTarget){
                        return
                    }

                    e.preventDefault();
                    e.stopPropagation();

                    if (activeDragNode == dragable.domNode){
                        return;
                    }

                    var pos;
                    if (Math.abs(activeDragNode.offsetLeft - dragable.domNode.offsetLeft) < Math.abs(activeDragNode.offsetTop - dragable.domNode.offsetTop)){
                        if (activeDragNode.offsetTop - dragable.domNode.offsetTop < 0){
                            pos = 'after';
                        } else {
                            pos = 'before';
                        }
                    } else {
                        if (activeDragNode.offsetLeft - dragable.domNode.offsetLeft < 0){
                            pos = 'after';
                        } else {
                            pos = 'before';
                        }
                    }

                    domConstruct.place(activeDragNode, dragable.domNode, pos);
                });

                on(dragable.domNode, 'drop', function(e){
                    e.preventDefault();
                });

                dragable.startup();
            }
        }
    );
});
