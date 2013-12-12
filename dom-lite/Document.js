// Defines a lightweight dom root node
var DocumentFragment = require('./DocumentFragment');
var Element = require('./Element');
var Text = require('./Text');
var Window = require('./Window');
var util = require('util');
var nodeType = require('./nodeType');

function Document(){
    Document.super_.call(this);
    this.nodeType = nodeType.DOCUMENT_NODE;

    var self = this;

    Object.defineProperty(this, 'defaultView', {
        get: function(){
            if (!self._window) self._window = new Window;
            return self._window;
        }
    });
}

util.inherits(Document, DocumentFragment);

Document.prototype.createDocumentFragment = function(){
    var fragment = new DocumentFragment;
    return fragment;
}

Document.prototype.createElement = function(tagName){
    var element = new Element;
    element.tagName = tagName.toUpperCase();
    return element;
}

Document.prototype.createTextNode = function(text){

    var textNode = new Text;
    textNode.nodeValue = text;
    return textNode;
}

Document.prototype.getElementById = function(id){

    var search = function(node){
        var children = node.children,
            i,
            result;
        for (i = 0; i < children.length; i++){
            if (children[i].getAttribute('id') == id){
                return children[i];
            }
            result = search(children[i]);
            if (result) return result;
        }
    }

    return search(this);
}

module.exports = Document;
