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

            templateString: '<${tag} data-dojo-attach-point="containerNode"><button class="btn-inverse"><img src="/favicon.png"/></button><button class="btn-inverse"><img src="/bootstrap.png"/></button></${tag}>',

            startup: function(){
                var zoop = this.containerNode.firstElementChild,
                    bootstrap = this.containerNode.lastElementChild;

                var zoopTooltip = new Tooltip({target: zoop, placement: 'bottom', title: 'View docs with zoop styles'});
                zoopTooltip.startup();

                var bootstrapTooltip = new Tooltip({target: bootstrap, placement: 'bottom', title: 'View docs with default bootstrap styles'});
                bootstrapTooltip.startup();

                this.watch('active', lang.hitch(this, function(p, o, n){
                    if (n == zoop){
                        document.location.href = document.location.href + '?theme=zoop';
                    } else if (n == bootstrap){
                        document.location.href = document.location.href + '?theme=bootstrap';
                    }
                }))
            }
        }
    );
});
