// Defines a lightweight dom root node
var Node = require('./Node');
var Window = require('./Window');
var util = require('util');

function Document(){
    Node.call(this, 9);

    var self = this;

    Object.defineProperty(this, 'defaultView', {
        get: function(){
            if (!self._window) self._window = new Window;
            return self._window;
        }
    });
}

util.inherits(Document, Node);

Document.prototype.createDocumentFragment = function(){
    return new Node(this, 1, 'div');
}

Document.prototype.createElement = function(tagName){
    return new Node(this, 1, tagName);
}

Document.prototype.createTextNode = function(text){

    var node = new Node(this, 3);
    node.nodeValue = text;
    return node;
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
