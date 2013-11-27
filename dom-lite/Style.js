// Defines a lightweight style object

function Style(){
    this.props = {};
}

Style.prototype.getPropertyValue = function(prop){
    return this.props[prop];
}

Style.prototype.setPropertyValue = function(prop, value){
    this.props[prop] = value;
}

module.exports = Style;
