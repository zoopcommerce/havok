define([
    'dojo/_base/declare',
    '../../widget/NavList',
    '../../widget/_AffixMixin',
    '../../widget/_ScrollspyMixin'
],
function (
    declare,
    NavList,
    AffixMixin,
    ScrollspyMixin
){
    // module:
    //    	havok/docs/module/SideNav

    return declare(
        [NavList, AffixMixin, ScrollspyMixin],
        {
            itemTemplate: '<li data-havok-spy-target="${id}"><a role="navitem" href="#${id}"><i class="icon-chevron-right pull-right"></i> ${text}</a></li>',

            viewportOffsetTop: 90,

            affixTarget: 'mainContent',

            spyTarget: 'mainContent',

            baseClass: 'nav nav-list well'
        }
    );
});
