define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom',
    'dojo/on',
    './Dragable',
    'dojo/dom-construct',
    'dijit/registry',
    '../get!./dragData'
],
function (
    declare,
    lang,
    array,
    dom,
    on,
    Dragable,
    domConstruct,
    registry,
    dragData
){
    // module:
    //		havok/widget/_SortableMixin

    return declare(
        [],
        {
            // summary:
            //      Mixin to a list type widget to make the list sortable via drag and drop

            /*=====
            // dropTargets: DomNode[]|String
            //      An array of dom nodes, or a space delimited string of dom node ids that
            //      can be targets for dropping list items.
            //      The special string `this` refers to the widget itself.
            //      Defaults to `[this.domNode]`.
            dropTargets: undefined,
            =====*/

            startup: function(){
                this.inherited(arguments);
                if (!this.dropTargets) this.dropTargets = [this.domNode];
                this.set('dropTargets', this.dropTargets);

                //handle dragging and dropping into an empty list
                on(this.domNode, 'dragover', lang.hitch(this, function(e){
                    if (this.domNode.children.length != 0) return;
                    e.preventDefault();
                    e.stopPropagation();
                    domConstruct.place(registry.byId(dragData['application/widget']).domNode, this.domNode);
                }));
                on(this.domNode, 'drop', function(e){
                    e.preventDefault();
                });
            },

            addItem: function(/*DomNode|String*/item, /*havok/widget/_ListMixin.__AddOptions?*/options){
                item = this.inherited(arguments);
                this._makeDragable(item);
                return item;
            },

            _setDropTargetsAttr: function(/*DomNode[]|String*/value){
                if (!this._started) {
                    this.dropTargets = value;
                    return;
                }

                if (typeof value == 'string'){
                    value = array.map(value.split(' '), lang.hitch(this, function(item){
                        return dom.byId(item);
                    }));
                }
                this._set('dropTargets', value);
            },

            _makeDragable: function(/*DomNode*/item){
                var dragable = new Dragable({}, item);

                on(dragable.domNode, 'dragover', function(e){

                    var activeDragNode = registry.byId(dragData['application/widget']).domNode;

                    if (registry.getEnclosingWidget(dragable.domNode.parentElement).dropTargets.indexOf(registry.getEnclosingWidget(activeDragNode.parentElement).domNode) == -1){
                        return;
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
            }
        }
    );
});
