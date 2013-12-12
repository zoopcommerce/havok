define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
],
function (
    declare,
    domConstruct,
    WidgetBase,
    TemplatedMixin
){
    // module:
    //    	havok/widget/_WidgetBase

    return declare(
        [WidgetBase, TemplatedMixin],
        {
            searchContainerNode: false,

            dir: 'ltr',

            tag: 'div',

            templateString: '<${tag} data-dojo-attach-point="containerNode"></${tag}>',

            buildRendering: function(){

                if (!this.srcNodeRef && this.innerHTML){
                    this.srcNodeRef = domConstruct.create('span', {innerHTML: this.innerHTML});
                }

                this.inherited(arguments);

                if (!this.domNode.getAttribute('data-dojo-type') && this.contextRequire) this.domNode.setAttribute('data-dojo-type', this.contextRequire.module.mid);
                this.domNode.setAttribute('data-dojo-props', '_rendered: true');
            },

            _processTemplateNode: function(/*DOMNode|Widget*/ baseNode){
                // This has been added to havok WidgetBase to accomodate server side templating
                // Override _AttachMixin._processNode to skip DOMNodes with data-dojo-type set.   They are handled separately
                // in the _beforeFillContent() code above.

                if (baseNode != this.domNode && baseNode.hasAttribute('data-dojo-type')){
                    return true;
                }

                return this.inherited(arguments);
            }
        }
    );
});
