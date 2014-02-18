var profile = (function(){
    var testResourceRe = /^havok\/test\//,
        buildResourceRe = /^havok\/build\//,
        distResourceRe = /^havok\/dist\//,
        docsBuildResourceRe = /^havok\/docs\/build\//,
        docsClientResourceRe = /^havok\/docs\/client\//,
        docsServerResourceRe = /^havok\/docs\/server\//,
        docsTwigResourceRe = /^havok\/docs\/twig\//,
        docsTempResourceRe = /^havok\/docs\/temp\//,
        domLiteResourceRe = /^havok\/dom-lite\//,
        nodeResourceRe = /^havok\/node_modules\//,
        tempResourceRe = /^havok\/temp\//;

    var less = function(filename, mid){
        var list = {};
        return (mid in list) ||
            /(less|css)$/.test(filename);
    };

    var ignore = function(filename, mid){
        var list = {
            "havok/dist"             : true,
            "havok/docs/build"       : true,
            "havok/docs/dist"        : true,
            "havok/docs/server"      : true,
            "havok/docs/twig"        : true,
            "havok/docs/temp"        : true,
            "havok/dom-lite"         : true,
            "havok/build"            : true,
            "havok/composer.json"    : true,
            "havok/node_modules"     : true,
            "havok/temp"             : true
        };
        return (mid in list) ||
            buildResourceRe.test(mid) ||
            distResourceRe.test(mid) ||
            docsBuildResourceRe.test(mid) ||
            docsServerResourceRe.test(mid) ||
            docsTwigResourceRe.test(mid) ||
            docsTempResourceRe.test(mid) ||
            domLiteResourceRe.test(mid) ||
            nodeResourceRe.test(mid) ||
            tempResourceRe.test(mid)
    };

    var test = function(filename, mid){
        var list = {
            "havok/test"     : true,
            "havok/phpunit.xml.dist" : true
        };
        return (mid in list) ||
            testResourceRe.test(mid);
    };

    var copyOnly = function(filename, mid){
        var list = {
            "havok/havok.profile"  : true,
            "havok/package.json" : true
        };
        return (mid in list) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    var miniExclude = function(filename, mid){
        var list = {
            "havok/CHANGELOG.md" : true,
            "havok/README.md"    : true,
            "havok/docs/client"  : true
        };
        return (mid in list) || docsClientResourceRe.test(mid)
    };

    return {
        resourceTags:{

            less: function(filename, mid){
                return less(filename, mid);
            },

            ignore: function(filename, mid){
                return ignore(filename, mid);
            },

            test: function(filename, mid){
                return test(filename, mid);
            },

            copyOnly: function(filename, mid){
                return copyOnly(filename, mid);
            },

            miniExclude: function(filename, mid){
                return miniExclude(filename, mid);
            },

            amd: function(filename, mid){
                return !test(filename, mid) &&
                    !copyOnly(filename, mid) &&
                    !ignore(filename, mid) &&
                    (/\.js$/).test(filename);
            }
        }
    };
})();