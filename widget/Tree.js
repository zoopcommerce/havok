define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/json',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    './_WidgetBase',
    './_ListMixin'
],
function (
    declare,
    lang,
    array,
    json,
    on,
    domConstruct,
    domClass,
    WidgetBase,
    ListMixin
){
    // module:
    //    	havok/widget/Tree

    return declare(
        [WidgetBase, ListMixin],
        {
            tag: 'ul'//,

//            startup: function(){
//
//                this.data = json.parse(data);
//
//                array.forEach(this.data.children, lang.hitch(this, function(item){
//                    this.addChild(this.root, item);
//                }));
//            },
//
//            addChild: function(parent, data){
//                var node,
//                    i;
//                if (data.type == 'folder'){
//                    for (i = 0; i < parent.children.length; i++){
//                        if (!domClass.contains(parent.children[i], 'folder')){
//                            node = domConstruct.create('li', {id: data.id, 'class': data.type, innerHTML: '<a href="">' + data.name + '</a>'}, parent.children[i], 'before');
//                            break;
//                        }
//                    }
//                }
//                if (!node) {
//                    node = domConstruct.create('li', {id: data.id, 'class': data.type, innerHTML: '<a href="">' + data.name + '</a>'}, parent);
//                }
//                on(
//                    node,
//                    'click',
//                    lang.hitch(this, function(e){
//                        this.onClick(e, node, data);
//                    })
//                );
//            },
//
//            onClick: function(e, node, data) {
//                e.preventDefault();
//                e.stopPropagation();
//                if (data.type == 'folder') {
//                    var list;
//                    if (node.children.length == 1) {
//                        list = domConstruct.create('ul', {'class': 'hide'}, node);
//                        array.forEach(data.children, lang.hitch(this, function(item){
//                            this.addChild(list, item);
//                        }));
//                    } else {
//                        list = node.children[1];
//                    }
//                    if (domClass.contains(list, 'hide')) {
//                        domClass.remove(list, 'hide');
//                    } else {
//                        domClass.add(list, 'hide');
//                    }
//                }
//            }
        }
    );
});
