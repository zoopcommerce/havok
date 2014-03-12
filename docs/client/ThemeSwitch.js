define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/cookie',
    'havok/widget/Tooltip',
    'havok/widget/RadioButtonGroup'
],
function (
    declare,
    lang,
    dom,
    cookie,
    Tooltip,
    RadioButtonGroup
){
    // module:
    //    	docs/ThemeSwitch

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

                (new Tooltip({target: zoop, placement: 'bottom', title: 'View docs with zoop styles'})).startup();
                (new Tooltip({target: bootstrap, placement: 'bottom', title: 'View docs with default bootstrap styles'})).startup();

                //remove preload
                var link = dom.byId('themeSwtichPreloadLink');
                if (link) link.parentElement.removeChild(link)

                this.watch('active', lang.hitch(this, function(p, o, n){
                    var link = dom.byId('themeSwtichLink');
                    if (n == zoop){
                        cookie('havok-docs-theme', 'zoop');
                        if (link) link.href = '/docs/zoop.css'
                    } else if (n == bootstrap){
                        cookie('havok-docs-theme', 'bootstrap');
                        if (link) link.href = '/docs/bootstrap.css'
                    }
                    if (!link) document.location.reload()
                }))

                if (theme == 'bootstrap') this.set('active', bootstrap);
                else this.set('active', zoop);
            }
        }
    );
});
