define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dijit/focus',
    './Color',
    '../widget/_DropdownBase',
    './_WidgetsInTemplateMixin',
    'dojo/text!./template/ColorDropdown.html',
    '../less!./less/colordropdown.less',
    '../form/HexColor',
    './Movable'
],
function (
    declare,
    lang,
    domStyle,
    domGeom,
    focus,
    Color,
    DropdownBase,
    WidgetsInTemplateMixin,
    template
){
    return declare([DropdownBase, WidgetsInTemplateMixin],
        {

            //value: undefined,

            templateString: template,

            hidden: true,

            //color: undefined,

            startup: function(){

                this.inherited(arguments);

                //set up watch on textbox
                var hexWatch;
                this.hex.on('focus', lang.hitch(this, function(){
                    hexWatch = this.hex.watch('state', lang.hitch(this, function(property, oldValue, newValue){
                        if (newValue == ''){
                            this.set('value', this.hex.get('value'));
                        }
                    }));
                }));
                this.hex.on('blur', function(){
                    hexWatch.unwatch();
                });
            },

            onHueHandleMoved: function(){
                this.set(
                    'value',
                    {
                        h: 359 * (1 - (this.hueHandle.domNode.offsetTop / this.hue.offsetHeight)),
                        s: this.color.s,
                        v: this.color.v
                    }
                );
            },

            onHueHandleClick: function(){
                focus.focus(this.hueHandle);
            },

            onBoxHandleMoved: function(){
                this.set(
                    'value',
                    {
                        h: this.color.h,
                        s: 100 * (this.boxHandle.domNode.offsetLeft / this.box.offsetWidth),
                        v: 100 * (1 - (this.boxHandle.domNode.offsetTop / this.box.offsetHeight))
                    }
                );
            },

            onBoxHandleClick: function(){
                focus.focus(this.boxHandle);
            },

            onHueClick: function(e){
                var pos = domGeom.position(this.hue);
                this.hueHandle.move(0, e.clientY - pos.y);
                focus.focus(this.hueHandle.domNode);
            },

            onBoxClick: function(e){
                var pos = domGeom.position(this.box);
                this.boxHandle.move(e.clientX - pos.x, e.clientY - pos.y);
                focus.focus(this.boxHandle.domNode);
            },

            _setValueAttr: function(value){
                //value should be either a string with a hex color, or a hsv object
                var hsv;
                if (typeof value == 'string'){
                    value = value.toUpperCase();
                    hsv = Color.fromHex(value).toHsv();
                } else {
                    hsv = value;
                    value = Color.fromHsv(value).toHex().toUpperCase();
                }
                this.color = hsv;
                this._set('value', value);


                if (!this._started){
                    return;
                }

                //update hex textbox
                if (this.hex && this.hex.get('value') != value){
                    this.hex.set('value', value);
                }

                domStyle.set(
                    this.box,
                    'backgroundColor',
                    Color.fromHsv(hsv.h, 100, 100).toHex()
                );

                domStyle.set(
                    this.hueHandle.domNode,
                    'top',
                    (this.hue.offsetHeight * (1 - hsv.h / 359)) + 'px'
                );

                domStyle.set(
                    this.boxHandle.domNode,
                    'left',
                    (this.box.offsetWidth * (hsv.s / 100)) + 'px'
                );
                domStyle.set(
                    this.boxHandle.domNode,
                    'top',
                    (this.box.offsetHeight * (1 - hsv.v / 100)) + 'px'
                );
            }
        }
    );
});
