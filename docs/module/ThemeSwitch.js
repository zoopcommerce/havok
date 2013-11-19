define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../../widget/Tooltip',
    '../../widget/RadioGroup'
],
function (
    declare,
    lang,
    Tooltip,
    RadioGroup
){
    // module:
    //    	havok/docs/module/Feedback

    return declare(
        [RadioGroup],
        {
            // baseClass: String
            baseClass: 'btn-group theme-switch',

            buildRendering: function(){
                this.inherited(arguments);
                this.zoop = this.addItem('<button class="btn-inverse"><img src="/favicon.png"/></button>');
                this.bootstrap = this.addItem('<button class="btn-inverse"><img src="/bootstrap.png"/></button>');
            },

            startup: function(){
                var zoopTooltip = new Tooltip({target: this.zoop, placement: 'bottom', title: 'View docs with zoop styles'});
                zoopTooltip.startup();

                var bootstrapTooltip = new Tooltip({target: this.bootstrap, placement: 'bottom', title: 'View docs with default bootstrap styles'});
                bootstrapTooltip.startup();

                this.watch('active', lang.hitch(this, function(p, o, n){
                    var doc = this.ownerDocument;
                    if (n == this.zoop){
                        doc.location.href = doc.location.href + '?theme=zoop';
                    } else if (n == this.bootstrap){
                        doc.location.href = doc.location.href + '?theme=bootstrap';
                    }
                }))
            }
        }
    );
});
