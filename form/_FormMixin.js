define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dijit/registry',
    'dijit/form/_FormMixin'
],
function (
    declare,
    array,
    registry,
    FormMixin
){
    // module:
    //    	havok/form/_FormMixin

    return declare(
        [FormMixin],
        {
            // summary:
            //      Mixin for form like widgets

            /*=====
            // postActivity: Boolean
            //      Has the form had user interaction?
            postActivity: undefined,
            =====*/

            startup: function(){
                this.inherited(arguments);

                //make sure state watches trigger on startup
                var state = this.state;
                this.state = 'startup';
                this.set('state', state);
            },

            _getInvalidWidgetsAttr: function(){
                // summary:
                //      Returns an array of child widgets which have a state != '' (ie have invalid state)

                return array.filter(this._descendants, function(widget){
                    return (widget.get('state') != '');
                });
            },

            _setPostActivityAttr: function(/*Boolean*/value){
                array.forEach(this._decendants, function(widget){
                    widget.set('postActivity', value);
                })
                this._set('postActivity', value);
            },

            _setInputsAttr: function(/*array*/value){
                // summary:
                //      Takes an array of input constructors and appends them to the form

                var input;
                for (var index in value){
                    input = new value[index];
                    this.containerNode.appendChild(input.domNode);
                }
            },

            _getState: function(){
                // summary:
                //		Compute what this.state should be based on state of children

                var states = array.map(registry.findWidgets(this.containerNode), function(widget){
                    return widget.get('state') || '';
                });

                if (array.indexOf(states, "Error") >= 0){
                    return 'Error';
                }
                if (array.indexOf(states, "Validating") >= 0){
                    return "Validating";
                }
                if (array.indexOf(states, 'Incomplete') >= 0){
                    return 'Incomplete';
                }

                if (array.filter(states, function(state){
                        return (state != '');
                    }).length > 0
                ){
                    return 'Invalid';
                }

                return '';
            }
        }
    );
});
