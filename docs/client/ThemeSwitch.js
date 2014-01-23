define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/cookie',
    '../../widget/Tooltip',
    '../../widget/RadioButtonGroup'
],
function (
    declare,
    lang,
    cookie,
    Tooltip,
    RadioButtonGroup
){
    // module:
    //    	havok/docs/module/Feedback

    return declare(
        [RadioButtonGroup],
        {
            // baseClass: String
            baseClass: 'btn-group theme-switch',

            templateString: '<${tag} data-dojo-attach-point="containerNode"><button class="btn-inverse"><img src="/favicon.png"/></button><button class="btn-inverse"><img src="/bootstrap.png"/></button></${tag}>',

            startup: function(){

                this.inherited(arguments);

                var zoop = this.containerNode.firstElementChild,
                    bootstrap = this.containerNode.lastElementChild,
                    theme = cookie('havok-docs-theme');

                var zoopTooltip = new Tooltip({target: zoop, placement: 'bottom', title: 'View docs with zoop styles'});
                zoopTooltip.startup();

                var bootstrapTooltip = new Tooltip({target: bootstrap, placement: 'bottom', title: 'View docs with default bootstrap styles'});
                bootstrapTooltip.startup();

                if (theme == 'bootstrap'){
                    this.set('active', bootstrap);
                } else {
                    this.set('active', zoop);
                }

                this.watch('active', lang.hitch(this, function(p, o, n){
                    if (n == zoop){
                        cookie('havok-docs-theme', 'zoop');
                    } else if (n == bootstrap){
                        cookie('havok-docs-theme', 'bootstrap');
                    }
                    document.location.reload();
                }))
            }
        }
    );
});
