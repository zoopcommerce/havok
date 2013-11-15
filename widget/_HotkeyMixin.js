define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/keys',
    'dojo/on'
],
function (
    declare,
    lang,
    array,
    keys,
    on
){
    // module:
    //    	havok/widget/_HotkeyMixin

    /*=====
    var __Key = {
        // ctrl: Boolean
        //      Should the `ctrl` key modifier be used?
        // shift: Boolean
        //      Should the `shift` key modifier be used?
        // alt: Boolean
        //      Should the `alt` key modifier be used?
        // char: String
        //      Indicates which key should be used in combination with any modifier keys.
        //      For a simple character, just use that character. Eg: `m`
        //      `ENTER` and `ESCAPE` are also valid values.
        //      For more options see `dojo/keys`
    };
    =====*/

    return declare(
        [],
        {
            // summary:
            //      Provides support for classes that want to use hotkeys

            /*=====
            // keys: __Key[]
            //      An array of objects that define the hotkeys to be used
            keys: undefined,
            =====*/

            // keyTarget: DomNode
            //      The dom node to attach the key press listener to
            keyTarget: window,

            /*=====
            // _keypressHandler: Object
            //      Holds a reference to any active key press handler
            _keypressHandler: undefined,
            =====*/

            destroy: function(){
                this._removeKeypressHandler();
                this.inherited(arguments);
            },

            _setKeysAttr: function(/*__Key[]|String*/value){
                // summary:
                //      sets the hotkeys that will emit a click event
                // value:
                //      If value is an array, it must be an array of __Key object.
                //      If the value is a string, it will be parsed into an array of __Key objects.
                //      In a string items must be separated by `;` and attributes by space. eg:
                //      `ctrl m; shift v`.

                if (typeof value == 'string'){
                    var i,
                        j,
                        combos = value.split(';'),
                        combo,
                        keys;

                    value = [];
                    for (i = 0; i < combos.length; i++){
                        keys = combos[i].split(' ');
                        combo = {};
                        for(j = 0; j < keys.length; j++){
                            switch (keys[j]){
                                case 'ctrl':
                                    combo.ctrl = true;
                                    break;
                                case 'alt':
                                    combo.alt = true;
                                    break;
                                case 'shift':
                                    combo.shift = true;
                                    break;
                                default:
                                    combo['char'] = keys[j];
                            }
                        }
                        value.push(combo);
                    }
                }
                if (!lang.isArray(value)){
                    value = [value];
                }
                this._set('keys', value);
                this._resetKeypressHandler();
            },

            _setKeyTargetAttr: function(/*DomNode*/value){
                this._set('keyTarget', value);
                this._resetKeypressHandler();
            },

            _resetKeypressHandler: function(){
                this._removeKeypressHandler();
                if (this.keys && this.keyTarget){
                    this._addKeypressHandler();
                }
            },

            _removeKeypressHandler: function(){
                if (this._keypressHandler){
                    this._keypressHandler.remove();
                }
            },

            _addKeypressHandler: function(){
                var getKeyCode = function(chr){
                        if (typeof chr == 'string' && keys[chr]){
                            return keys[chr];
                        } else if (typeof chr == 'string'){
                            return chr.charCodeAt(0);
                        } else {
                            return chr
                        }
                    },
                    getKeyChar = function(code){
                        return String.fromCharCode(code).toUpperCase();
                    }
                this._keypressHandler = on(this.keyTarget, 'keydown', lang.hitch(this, function(evt){
                    array.forEach(this.keys, lang.hitch(this, function(key){

                        var keyChar,
                            keyCode,
                            ctrl = false,
                            shift = false,
                            alt = false;

                        if (typeof key == 'object'){
                            if (key['char']){
                                keyChar = key['char'].toUpperCase();
                                keyCode = getKeyCode(key['char']);
                            }
                            if (key.code){
                                keyCode = key.code;
                                keyChar = getKeyChar(key.code);
                            }
                            ctrl = !!key.ctrl;
                            shift = !!key.shift;
                            alt = !!key.alt;
                        } else if (typeof key == 'string') {
                            keyChar = key.toUpperCase();
                            keyCode = getKeyCode(key);
                        } else {
                            keyCode = key;
                            keyChar = getKeyChar(key);
                        }

                        if ((String.fromCharCode(evt.keyCode) == keyChar || evt.keyCode == keyCode) && evt.ctrlKey == ctrl && evt.shiftKey == shift && evt.altKey == alt){
                            evt.preventDefault();
                            this.emit('click', evt);
                        }
                    }));
                }))
            }
        }
    );
});
