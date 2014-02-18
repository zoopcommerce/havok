define([
    'dojo/_base/declare',
    '../../widget/NavList',
    '../../widget/_AffixMixin',
    '../../widget/_ScrollSpyMixin'
],
function (
    declare,
    NavList,
    AffixMixin,
    ScrollSpyMixin
){
    // module:
    //    	havok/docs/module/SideNav

    return declare(
        [NavList, AffixMixin, ScrollSpyMixin],
        {
            itemTemplate: '<li data-havok-spy-target="${id}"><a role="navitem" href="#${id}"><i class="fa fa-chevron-right pull-right"></i> ${text}</a></li>',

            viewportOffsetTop: 90,

            affix: 'mainContent',

            scrollSpy: 'mainContent',

            baseClass: 'nav nav-list well'
        }
    );
});
