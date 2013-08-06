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
    //    	havok/widget/_KeypressMixin

    return declare(
        [],
        {
            //keys: undefined,

            keyTarget: window,

            destroy: function(){
                this._removeKeypressHandler();
                this.inherited(arguments);
            },

            _setKeysAttr: function(value){
                if (!lang.isArray(value)){
                    value = [value];
                }
                this._set('keys', value);
                this._resetKeypressHandler();
            },

            _setKeyTargetAttr: function(value){
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
