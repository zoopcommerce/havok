define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/window',
    'dojo/keys',
    'dijit/focus',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dijit/a11yclick',
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
    domClass,
    domConstruct,
    domGeom,
    a11yclick,
    WidgetBase,
    HideableMixin
){
    // module:
    //    	havok/widget/DropdownToggle

    return declare(
        [WidgetBase, HideableMixin],
        {
            // summary:
            //      Provides a trigger to show/hide a dropdown

            // baseClass: String
            baseClass: 'dropdown',

            /*=====
            // button: DomNode
            button: undefined,
            =====*/

            /*=====
            // dropdown: havok/widget/_DropdownBase
            //      The dropdown widget that this toggle is linked to
            dropdown: undefined,
            =====*/

            /*=====
            // dropdownContainer: DomNode
            dropdownContainer: undefined,
            =====*/

            // togglePlacement: String
            //      This property defines which corner of the toggle the dropdown will be aligned to
            //      Possible values are top-left | top-right | bottom-left | bottom-right
            //      Default value is `bottom-left`
            togglePlacement: 'bottom-left',

            // dropdownPlacement: String
            //      This property defined which corner of the dropdown that the toggle will be aligned to
            //      Possible values are top-left | top-right | bottom-left | bottom-right
            //      Default value is `top-left`
            dropdownPlacement: 'top-left',

            /*=====
            // _activeTogglePlacement: String
            _activeTogglePlacement: undefined,
            =====*/

            /*=====
            // _activeDropdownPlacement: String
            _activeDropdownPlacement: undefined,
            =====*/

            /*=====
            // hasMouse: Boolean
            hasMouse: undefined,
            =====*/

            /*=====
            // _keypressHandlers: Object[]
            _keypressHandlers: undefined,
            =====*/

            buildRendering: function(){

                if (!this.tag){
                    this.tag = 'div';
                }
                if (this.srcNodeRef && ['UL', 'W-NAV-TAB', 'W-NAV-PILL', 'W-NAV-BAR-LINKS'].indexOf(this.srcNodeRef.parentNode.tagName) != -1){
                    this.tag = 'li';
                }
                this.inherited(arguments);
            },

            startup: function(){

                if (!this.button){
                    var i,
                        node;

                    for (i = 0; i < this.containerNode.children.length; i++){
                        node = this.containerNode.children[i];
                        if (node.hasAttribute('dropdown-toggle')){
                            this.button = node;
                            break;
                        }
                    }
                }
                if (!this.button){
                    this.button = this.domNode;
                }

                domClass.add(this.button, 'dropdown-toggle');
                this.button.setAttribute('role', 'button');

                if (!this.dropdown){
                    var children = this.getChildren();
                    this.dropdown = children[children.length - 1];
                }

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

            onClick: function(/*Event*/e){
                e.preventDefault();
                this.toggle();
            },

            onMouseleave: function(/*Event*/e){
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

                this._activeTogglePlacement = togglePlacement;
                this._activeDropdownPlacement = dropdownPlacement;
                this.dropdown.domNode.style.top = target.y + 'px';
                this.dropdown.domNode.style.left = target.x + 'px';
            }
        }
    );
});
