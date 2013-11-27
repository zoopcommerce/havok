// Defines a lightweight dom node
var parser = require('./parser'),
    nodeType = require('./nodeType'),
    escape = require('./escape');

var selfClosingTags = [
    'IMG',
    'BR',
    'HR',
    'PATH'
];

function Node(doc, newNodeType, name, attribs, parentNode){

    this.ownerDocument = doc;
    this.nodeType = newNodeType;
    if (newNodeType == nodeType.Tag) this.tagName = name.toUpperCase();
    this._eventListeners = [];
    this.attributes = [];
    this.childNodes = [];
    this.parentNode = parentNode;
    this.style = {};

    for (var i in attribs){
        this.attributes.push({name: i, value: attribs[i], specified: true})
    }

    if (parentNode){
        parentNode.childNodes.push(this);
    }

    var self = this;

    Object.defineProperty(this, 'children', {
        get: function(){
            return self.childNodes.filter(function(node){return (node.nodeType == nodeType.Tag)})
        }
    });

    Object.defineProperty(this, 'className', {
        get: function(){
            return self.getAttribute('class') || '';
        },
        set: function(value){
            return self.setAttribute('class', value);
        }
    });

    Object.defineProperty(this, 'firstChild', {
        get: function(){
            if (self.childNodes.length > 0) return self.childNodes[0];
        }
    });

    Object.defineProperty(this, 'firstElementChild', {
        get: function(){
            var children = self.children;
            if (children.length > 0) return children[0];
        }
    });

    Object.defineProperty(this, 'id', {
        get: function(){
            return self.getAttribute('id');
        },
        set: function(value){
            return self.setAttribute('id', value);
        }
    });

    Object.defineProperty(this, 'innerHTML', {
        get: function(){
            if (self.nodeType == nodeType.Tag || self.nodeType == nodeType.Document){
                var pieces = [];
                pieces.push('<');
                pieces.push(self.tagName);
                pieces.push(' ');
                self.attributes.forEach(function(attr){
                    pieces.push(attr.name);
                    pieces.push('="');
                    pieces.push(attr.value);
                    pieces.push('" ');
                });
                if (selfClosingTags.indexOf(self.tagName) == -1){
                    pieces.push('>');
                    self.childNodes.forEach(function(node){
                        pieces.push(node.innerHTML);
                    });
                    pieces.push('</');
                    pieces.push(self.tagName);
                    pieces.push('>');
                } else {
                    pieces.push('/>');
                }
                return pieces.join('');
            } else if (self.nodeType == nodeType.Text){
                return escape.escape(self.nodeValue);
            } else {
                return self.nodeValue;
            }
        },
        set: function(rawHtml){
            parser.parse(rawHtml, function(dom){
                self.childNodes = dom.childNodes;
                self.childNodes.forEach(function(node){
                    node.parentNode = self;
                })
            });
        }
    });

    Object.defineProperty(this, 'lastChild', {
        get: function(){
            if (self.childNodes.length > 0) return self.childNodes[self.childNodes.length - 1];
        }
    });

    Object.defineProperty(this, 'lastElementChild', {
        get: function(){
            var children = self.children;
            if (children.length > 0) return children[children.length - 1];
        }
    });

    Object.defineProperty(this, 'nextSibling', {
        get: function(){
            if (!self.parentNode) return;
            var i = self.parentNode.childNodes.indexOf(self);
            if (self.parentNode.childNodes.length < i + 2) return;
            return self.parentNode.childNodes[i + 1];
        }
    });
}

Node.prototype.addEventListener = function(type, callback){
    this._eventListeners.push({type: type, callback: callback});
}

Node.prototype.appendChild = function(node){
    this.insertBefore(node);
}

Node.prototype.cloneNode = function(deep){

    var newNode = new Node(this.doc, this.nodeType, this.tagName);

    this.attributes.forEach(function(attr){newNode.attributes.push({
        name: attr.name,
        value: attr.value,
        specified: true
    })});
    this._eventListeners.forEach(function(listener){newNode._eventListeners.push({
        type: listener.type,
        callback: listener.callback
    })});
    newNode.nodeValue = this.nodeValue;

    if (deep){
        this.childNodes.forEach(function(node){
            var newChild = node.cloneNode(deep);
            newNode.childNodes.push(newChild);
            newChild.parentNode = newNode;
        })
    }
    return newNode;
}

Node.prototype.getAttribute = function(attrName){
    var attrNode = this.getAttributeNode(attrName);
    if (attrNode) return attrNode.value;
}

Node.prototype.getAttributeNode = function(attrName){
    for (var i = 0; i < this.attributes.length; i++){
        if (this.attributes[i].name == attrName){
            return this.attributes[i];
        }
    }
}

Node.prototype.getElementsByTagName = function(tagName){

    tagName = tagName.toUpperCase();

    var result = [],
        search = function(node){
            if (node.tagName == tagName) result.push(node);
            node.children.forEach(search);
        }
    search(this);
    return result;
};

Node.prototype.hasAttribute = function(attrName){
    return !!(this.getAttributeNode(attrName));
}

Node.prototype.hasChildNodes = function(){
    return (this.childNodes.length > 0);
}

Node.prototype.insertBefore = function(node, ref){
    if (node.parentNode) node.parentNode.removeChild(node);
    node.parentNode = this;

    if (ref){
        var i = this.childNodes.indexOf(ref);
        this.childNodes.splice(i, 0, node);
    } else {
        this.childNodes.push(node);
    }

    return (this.childNodes.length > 0);
}

Node.prototype.querySelectorAll = function(query){
    var result = [],
        attributeMatches = /\[(.*?)\]/.exec(query),
        attributeName = attributeMatches ? attributeMatches[1] : null,
        search = function(node){
            node.attributes.forEach(function(attr){
                if (attributeName == attr.name) result.push(node)
            })
            node.children.forEach(search);
        };
    search(this);

    return result;
}


Node.prototype.removeChild = function(node){
    var i = this.childNodes.indexOf(node);
    if (i > -1) this.childNodes.splice(i, 1);
    node.parentNode = undefined;
    return node;
}

Node.prototype.replaceChild = function(newNode, oldNode){
    var i = this.childNodes.indexOf(oldNode);
    if (i > -1) this.childNodes[i] = newNode;
    newNode.parentNode = this;
}

Node.prototype.setAttribute = function(attrName, value){
    for (var i = 0; i < this.attributes.length; i++){
        if (this.attributes[i].name == attrName){
            this.attributes[i].value = value;
            return;
        }
    }
    this.attributes.push({name: attrName, value: value, specified: true});
}

module.exports = Node;
