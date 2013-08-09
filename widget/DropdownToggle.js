define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/window',
    'dojo/query',
    'dojo/keys',
    'dijit/focus',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-attr',
    'dijit/a11yclick',
    'dijit/registry',
    './_WidgetBase',
    './_HideableMixin'
],
function (
    declare,
    lang,
    array,
    on,
    win,
    query,
    keys,
    focus,
    domStyle,
    domClass,
    domConstruct,
    domGeom,
    domAttr,
    a11yclick,
    registry,
    WidgetBase,
    HideableMixin
){
    // module:
    //    	havok/widget/DropdownToggle

    return declare(
        [WidgetBase, HideableMixin],
        {

            defaultClass: 'dropdown',

            //dropdown: undefined,

            //dropdownContainer: undefined,

            placement: {
                placementNode: 'bottom-left',
                dropdown: 'top-left'
            },

            //_activePlacement: undefined,

            //hasMouse: undefined,

            //_keypressHandlers: undefined,

            buildRendering: function(){

                if (!this.tag){
                    this.tag = 'div';
                }
                if (this.srcNodeRef){
                    this.tag = this.srcNodeRef.nodeName;
                }
                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create(this.tag, {innerHTML: this.innerHTML});
                }
                this.inherited(arguments);
            },

            startup: function(){

                query('[data-dojo-attach-point]', this.containerNode).forEach(lang.hitch(this, function(attachNode){
                    if (registry.getEnclosingWidget(attachNode) === this){
                        array.forEach(domAttr.get(attachNode, 'data-dojo-attach-point').split(','), lang.hitch(this, function(point){
                            this[lang.trim(point)] = attachNode;
                        }))
                    }
                }));

                if (!this.button){
                    this.button = this.domNode;
                }
                if (!this.placementNode){
                    this.placementNode = this.domNode;
                }

                domClass.add(this.button, 'dropdown-toggle');
                domAttr.set(this.button, 'role', 'button');

                if (!this.dropdown){
                    var children = this.getChildren();
                    this.dropdown = children[children.length -1];
                }
                this.dropdown.startup();

                this.inherited(arguments);

                on(this.button, a11yclick.click, lang.hitch(this, 'onClick'));
                this.dropdown.watch('hasMouse', lang.hitch(this, function(property, oldValue, newValue){
                    this.set('hasMouse', newValue);
                    if (!newValue){
                        this.hide();
                    }
                }));
                this.dropdown.on('item-click', lang.hitch(this, function(e){
                    this.emit('item-click', e);
                }));
                on(this.domNode, 'mouseleave', lang.hitch(this, 'onMouseleave'));
            },

            destroy: function(){
                this._removeKeypressHandlers();
                this.inherited(arguments);
            },

            onClick: function(e){
                e.preventDefault();
                this.toggle();
            },

            onMouseleave: function(e){
                //use timeout to allow the mouse to bounce into the dropdown
                setTimeout(lang.hitch(this, function(){
                    if (!this.dropdown.get('hasMouse')){
                        this.hide();
                    }
                }), 50);
            },

            _show: function(){
                if (!this.dropdownContainer){
                    this.dropdownContainer = domConstruct.create('div', {'class': 'dropdown hidden', style: 'position: static'}, document.body, 'last');
                    domConstruct.place(this.dropdown.domNode, this.dropdownContainer, 'last');
                }
                domClass.remove(this.dropdownContainer, 'hidden');
                domClass.remove(this.dropdown.domNode, 'hidden');
                domClass.add(this.dropdownContainer, 'open');
                this._addKeypressHandlers();
                this.position();
            },

            _hide: function(){
                if (this.dropdownContainer){
                    domClass.remove(this.dropdownContainer, 'open');
                    domClass.add(this.dropdownContainer, 'hidden');
                }
                if (this.dropdown.childHasMouse){
                    this.dropdown.childHasMouse.hide();
                }
                this._removeKeypressHandlers();
            },

            _removeKeypressHandlers: function(){
                if (this._keypressHandlers){
                    array.forEach(this._keypressHandlers, function(handler){handler.remove()});
                }
            },

            _addKeypressHandlers: function(){
                this._keypressHandlers = [
                    on(window, 'keydown', lang.hitch(this, function(evt){
                        if (evt.keyCode == keys.ESCAPE){
                            evt.preventDefault();
                            this.hide();
                        }
                    })),
                    on(this.domNode, 'keydown', lang.hitch(this, function(evt){
                        if (evt.keyCode == keys.DOWN_ARROW){
                            var node = this.dropdown.containerNode.firstElementChild,
                                nodeList;

                            while (node){
                                nodeList = query('A', node);
                                if (nodeList.length > 0){
                                    focus.focus(nodeList[0]);
                                    evt.preventDefault();
                                    return;
                                }
                                node = node.nextElementSibling;
                            }
                        }
                    }))
                ]
            },

            position: function() {
                var placement = lang.clone(this.placement),
                    placementNodePos = domGeom.position(this.placementNode, true),
                    dropdownPos = domGeom.position(this.dropdown.domNode, true),
                    box = win.getBox(),
                    scroll = domGeom.docScroll().y,
                    scrollTop = scroll,
                    scrollBottom = scroll + box.h,
                    windowWidth  = box.w,
                    anchor = {},
                    target = {},
                    calcTarget = function(){
                        if (placement.placementNode.indexOf('top') !== -1){
                            anchor.y = placementNodePos.y;
                        } else {
                            anchor.y = placementNodePos.y + placementNodePos.h;
                        }

                        if (placement.placementNode.indexOf('left') !== -1){
                            anchor.x = placementNodePos.x;
                        } else {
                            anchor.x = placementNodePos.x + placementNodePos.w;
                        }

                        if (placement.dropdown.indexOf('top') !== -1){
                            target.y = anchor.y;
                        } else {
                            target.y = anchor.y - dropdownPos.h;
                        }

                        if (placement.dropdown.indexOf('left') !== -1){
                            target.x = anchor.x;
                        } else {
                            target.x = anchor.x - dropdownPos.w;
                        }
                    };

                calcTarget();
                if (target.x < 0){
                    if (placement.placementNode.indexOf('left') !== -1){
                        placement.placementNode = placement.placementNode.replace('left', 'right');
                    } else {
                        placement.placementNode = placement.placementNode.replace('right', 'left');
                    }
                    if (placement.dropdown.indexOf('right') !== -1){
                        placement.dropdown = placement.dropdown.replace('right', 'left');
                    } else {
                        placement.dropdown = placement.dropdown.replace('left', 'right');
                    }
                    calcTarget();
                }

                if (target.x + dropdownPos.w > windowWidth){
                    if (placement.placementNode.indexOf('right') !== -1){
                        placement.placementNode = placement.placementNode.replace('right', 'left');
                    } else {
                        placement.placementNode = placement.placementNode.replace('left', 'right');
                    }
                    if (placement.dropdown.indexOf('left') !== -1){
                        placement.dropdown = placement.dropdown.replace('left', 'right');
                    } else {
                        placement.dropdown = placement.dropdown.replace('right', 'left');
                    }
                    calcTarget();
                }

                if (target.y < scrollTop){
                    if (placement.placementNode.indexOf('top') !== -1){
                        placement.placementNode = placement.placementNode.replace('top', 'bottom');
                    } else {
                        placement.placementNode = placement.placementNode.replace('bottom', 'top');
                    }
                    if (placement.dropdown.indexOf('bottom') !== -1){
                        placement.dropdown = placement.dropdown.replace('bottom', 'top');
                    } else {
                        placement.dropdown = placement.dropdown.replace('top', 'bottom');
                    }
                    calcTarget();
                }

                if (target.y + dropdownPos.h > scrollBottom){
                    if (placement.placementNode.indexOf('bottom') !== -1){
                        placement.placementNode = placement.placementNode.replace('bottom', 'top');
                    } else {
                        placement.placementNode = placement.placementNode.replace('top', 'bottom');
                    }
                    if (placement.dropdown.indexOf('top') !== -1){
                        placement.dropdown = placement.dropdown.replace('top', 'bottom');
                    } else {
                        placement.dropdown = placement.dropdown.replace('bottom', 'top');
                    }
                    calcTarget();
                }

                this._activePlacement = placement;
                domStyle.set(this.dropdown.domNode, 'top', target.y + 'px');
                domStyle.set(this.dropdown.domNode, 'left', target.x + 'px');
            }
        }
    );
});
