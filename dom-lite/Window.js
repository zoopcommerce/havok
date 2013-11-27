// Defines a lightweight dom window
var Style = require('./Style');

function Window(){
}

Window.prototype.getComputedStyle = function(element){
    if (element.tagName == 'PRE'){
        var style = new Style;
        style.setPropertyValue('white-space', 'pre');
        return style;
    } else {
        return new Style;
    }
}

module.exports = Window;
