var Node = require('./Node'),
    Document = require('./Document'),
    nodeType = require('./nodeType'),
    escape = require('./escape');

function Dom(callback){
	this._callback = callback;
	this.dom = new Document;
	this._done = false;
	this._tagStack = [];
}

//Resets the handler back to starting state
Dom.prototype.onreset = function(){
	Dom.call(this, this._callback);
};

//Signals the handler that parsing is done
Dom.prototype.onend = function(){
	if(this._done) return;
	this._done = true;
	this._handleCallback(null);
};

Dom.prototype._handleCallback =
Dom.prototype.onerror = function(error){
	if(typeof this._callback === "function"){
		this._callback(error, this.dom);
	} else {
		if(error) throw error;
	}
};

Dom.prototype.onclosetag = function(name){
	this._tagStack.pop();
};

Dom.prototype.onopentag = function(name, attribs){

    var lastTag = this._tagStack[this._tagStack.length - 1],
        parent = lastTag ? lastTag : this.dom,
        element = new Node(this.dom, 1, name, attribs, parent);

	this._tagStack.push(element);

    if (name == 'body'){
        this.dom.body = element;
    }
    if (name == 'head'){
        this.dom.head = element;
    }
};

Dom.prototype.ontext = function(data){

	var lastTag;

    data = escape.unescape(data.replace(/^\n|\n$/, ''));

	if(!this._tagStack.length && this.dom.childNodes.length && (lastTag = this.dom.childNodes[this.dom.childNodes.length-1]).nodeType === nodeType.Text){
    	lastTag.nodeValue += data;
	} else {
		if(
			this._tagStack.length &&
			(lastTag = this._tagStack[this._tagStack.length - 1]) &&
			(lastTag = lastTag.childNodes[lastTag.childNodes.length - 1]) &&
			lastTag.nodeType === nodeType.Text
		){
    		lastTag.nodeValue += data;
		} else {

            lastTag = this._tagStack[this._tagStack.length - 1];
            var parent = lastTag ? lastTag : this.dom;

            var newNode = new Node(this.dom, nodeType.Text, null, null, parent);
            newNode.nodeValue = data;
		}
	}
};

Dom.prototype.oncomment = function(data){
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if(lastTag && lastTag.nodeType === nodeType.Comment){
		lastTag.nodeValue += data;
		return;
	}

	var newNode = {
        nodeType: nodeType.Comment,
        nodeValue: data
	};

    if(lastTag){
        lastTag.childNodes.push(newNode);
    } else { //There aren't parent elements
        this.dom.childNodes.push(newNode);
    }

	this._tagStack.push(newNode);
};

Dom.prototype.oncdatastart = function(){
    var lastTag = this._tagStack[this._tagStack.length - 1];
	var newNode = {
		childNodes: [{
			nodeValue: '',
			nodeType: nodeType.Text
		}],
		nodeType: nodeType.CDATA
	};

    if(lastTag){
        lastTag.childNodes.push(newNode);
    } else { //There aren't parent elements
        this.dom.childNodes.push(newNode);
    }

	this._tagStack.push(newNode);
};

Dom.prototype.oncommentend = Dom.prototype.oncdataend = function(){
	this._tagStack.pop();
};

Dom.prototype.onprocessinginstruction = function(name, data){
    var lastTag = this._tagStack[this._tagStack.length - 1];

    var newNode = {
        tagName: name,
        nodeValue: data,
        nodeType: nodeType.Directive
    };

    if(lastTag){
        lastTag.childNodes.push(newNode);
    } else { //There aren't parent elements
        this.dom.childNodes.push(newNode);
    }
};

module.exports = Dom;
