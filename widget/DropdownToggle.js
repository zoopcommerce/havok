define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/window',
    'dojo/keys',
    'dijit/focus',
    'dojo/dom',
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
    keys,
    focus,
    dom,
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

            //tag: undefined,

            templateString: '<${tag} data-dojo-attach-point="containerNode"></${tag}>',

            //dropdown: undefined,

            //dropdownContainer: undefined,

            togglePlacement: 'bottom-left',

            dropdownPlacement: 'top-left',

            //_activeTogglePlacement: undefined,

            //_activeDropdownPlacement: undefined,

            //hasMouse: undefined,

            //_keypressHandlers: undefined,

            buildRendering: function(){

                if (!this.tag){
                    this.tag = 'div';
                }
                if (this.srcNodeRef && ['UL', 'NAV-TAB', 'NAV-PILL'].indexOf(this.srcNodeRef.parentElement.nodeName) != -1){
                    this.tag = 'li';
                }
                this.inherited(arguments);
            },

            startup: function(){

                if (typeof this.button == 'string'){
                    this.button = dom.byId(this.button);
                } else if (!this.button){
                    this.button = this.domNode;
                }

                domClass.add(this.button, 'dropdown-toggle');
                domAttr.set(this.button, 'role', 'button');

                if (typeof this.dropdown == 'string'){
                    this.dropdown = registry.byId(this.dropdown);
                } else if (!this.dropdown){
                    var children = this.getChildren();
                    this.dropdown = children[children.length -1];
                }
                this.dropdown.startup();

                this.inherited(arguments);

                on(this.button, 'mouseleave', lang.hitch(this, 'onMouseleave'));
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
                            var nodes = this.dropdown.containerNode.getElementsByTagName('a');
                            if (nodes.length > 0){
                                focus.focus(nodes[0]);
                                evt.preventDefault();
                                return;
                            }
                        }
                    }))
                ]
            },

            position: function() {
                var togglePlacement = this.togglePlacement,
                    dropdownPlacement = this.dropdownPlacement,
                    placementNodePos = domGeom.position(this.domNode, true),
                    dropdownPos = domGeom.position(this.dropdown.domNode, true),
                    box = win.getBox(),
                    scroll = domGeom.docScroll().y,
                    scrollTop = scroll,
                    scrollBottom = scroll + box.h,
                    windowWidth  = box.w,
                    anchor = {},
                    target = {},
                    calcTarget = function(){
                        if (togglePlacement.indexOf('top') !== -1){
                            anchor.y = placementNodePos.y;
                        } else {
                            anchor.y = placementNodePos.y + placementNodePos.h;
                        }

                        if (togglePlacement.indexOf('left') !== -1){
                            anchor.x = placementNodePos.x;
                        } else {
                            anchor.x = placementNodePos.x + placementNodePos.w;
                        }

                        if (dropdownPlacement.indexOf('top') !== -1){
                            target.y = anchor.y;
                        } else {
                            target.y = anchor.y - dropdownPos.h;
                        }

                        if (dropdownPlacement.indexOf('left') !== -1){
                            target.x = anchor.x;
                        } else {
                            target.x = anchor.x - dropdownPos.w;
                        }
                    };

                calcTarget();
                if (target.x < 0){
                    if (togglePlacement.indexOf('left') !== -1){
                        togglePlacement = togglePlacement.replace('left', 'right');
                    } else {
                        togglePlacement = togglePlacement.replace('right', 'left');
                    }
                    if (dropdownPlacement.indexOf('right') !== -1){
                        dropdownPlacement = dropdownPlacement.replace('right', 'left');
                    } else {
                        dropdownPlacement = dropdownPlacement.replace('left', 'right');
                    }
                    calcTarget();
                }

                if (target.x + dropdownPos.w > windowWidth){
                    if (togglePlacement.indexOf('right') !== -1){
                        togglePlacement = togglePlacement.replace('right', 'left');
                    } else {
                        togglePlacement = togglePlacement.replace('left', 'right');
                    }
                    if (dropdownPlacement.indexOf('left') !== -1){
                        dropdownPlacement = dropdownPlacement.replace('left', 'right');
                    } else {
                        dropdownPlacement = dropdownPlacement.replace('right', 'left');
                    }
                    calcTarget();
                }

                if (target.y < scrollTop){
                    if (togglePlacement.indexOf('top') !== -1){
                        togglePlacement = togglePlacement.replace('top', 'bottom');
                    } else {
                        togglePlacement = togglePlacement.replace('bottom', 'top');
                    }
                    if (dropdownPlacement.indexOf('bottom') !== -1){
                        dropdownPlacement = dropdownPlacement.replace('bottom', 'top');
                    } else {
                        dropdownPlacement = dropdownPlacement.replace('top', 'bottom');
                    }
                    calcTarget();
                }

                if (target.y + dropdownPos.h > scrollBottom){
                    if (togglePlacement.indexOf('bottom') !== -1){
                        togglePlacement = togglePlacement.replace('bottom', 'top');
                    } else {
                        togglePlacement = togglePlacement.replace('top', 'bottom');
                    }
                    if (dropdownPlacement.indexOf('top') !== -1){
                        dropdownPlacement = dropdownPlacement.replace('top', 'bottom');
                    } else {
                        dropdownPlacement = dropdownPlacement.replace('bottom', 'top');
                    }
                    calcTarget();
                }

                this._activeTogglePlacement = togglePlacement;
                this._activeDropdownPlacement = dropdownPlacement;
                domStyle.set(this.dropdown.domNode, 'top', target.y + 'px');
                domStyle.set(this.dropdown.domNode, 'left', target.x + 'px');
            }
        }
    );
});
