define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dojo/on',
    'dojo/when',
    'dojo/dom-class',
    'dijit/a11yclick',
    './ButtonGroup'
],
function (
    declare,
    lang,
    array,
    Deferred,
    DeferredList,
    on,
    when,
    domClass,
    a11yclick,
    ButtonGroup
){
    // module:
    //    	havok/widget/CheckboxGroup

    return declare(
        [ButtonGroup],
        {

            _attachClickListener: function(node, item){

                on(node, a11yclick.click, lang.hitch(this, function(e){
                    e.preventDefault();
                    if (domClass.contains(e.target, 'disabled')){
                        return;
                    }

                    var active = this.get('active'),
                        i,
                        removed = false;
                    if (!active){
                        active = [];
                    }
                    active = array.map(active, lang.hitch(this, function(item){
                        if (typeof item == 'object'){
                            return item[this.store.idProperty];
                        } else {
                            return item;
                        }
                    }));
                    for (i = 0; i < active.length; i++){
                        if (active[i] == item[this.store.idProperty]){
                            active.splice(i, i+1);
                            removed = true;
                            break;
                        }
                    }
                    if (!removed){
                        active.push(item);
                    }
                    this.set('active', active);
                    this.emit('item-click', item);
                }));
            },

            _setActiveAttr: function(value){

                if (!value){
                    this._set('active', value);
                    return;
                }
                if (!lang.isArray(value)){
                    value = [value];
                }

                var list = [];
                array.forEach(value, lang.hitch(this, function(valueItem){
                    var deferred = new Deferred,
                        id;

                    if (this.store && this.store.get){
                        if (typeof valueItem == 'object'){
                            id = valueItem[this.store.idProperty];
                        } else {
                            id = valueItem;
                        }
                        when(this.store.get(id), lang.hitch(this, function(storeItem){
                            deferred.resolve(storeItem);
                        }))
                    } else {
                        deferred.resolve(valueItem);
                    }
                    list.push(deferred);
                }));

                var deferredList = new DeferredList(list);

                deferredList.then(lang.hitch(this, function(value){
                    var fliteredValues = array.map(
                        array.filter(value, function(valueItem){
                            if (valueItem[0] && valueItem[1]){
                                return true;
                            }
                        }),
                        function(valueItem){
                            return valueItem[1];
                        }
                    );
                    array.forEach(this.active, lang.hitch(this, function(activeItem){
                        if (typeof activeItem == 'object'){
                            domClass.remove(this.nodes[activeItem.id], 'active');
                        }
                    }));
                    array.forEach(fliteredValues, lang.hitch(this, function(valueItem){
                        if (this.nodes[valueItem.id]){
                            domClass.add(this.nodes[valueItem.id], 'active');
                        }
                    }));

                    this._set('active', fliteredValues);
                }));
            }
        }
    );
});
