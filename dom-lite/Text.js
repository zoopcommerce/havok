
var util = require('util');
var Node = require('./Node');
var nodeType = require('./nodeType');

function Text(){

    Text.super_.call(this);
    this.nodeType = nodeType.TEXT_NODE;

}

util.inherits(Text, Node);

module.exports = Text;
