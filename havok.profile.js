var profile = (function(){
    var testResourceRe = /^havok\/test\//,
        buildResourceRe = /^havok\/build\//,
        lessLibRe = /^havok\/vendor\/less\/lib\//,
        docsResourceRe = /^havok\/docs\//;

    var less = function(filename, mid){
        var list = {};
        return (mid in list) ||
            /(less|css)$/.test(filename);
    };

    var ignore = function(filename, mid){
        var list = {
            "havok/docs"             : true,
            "havok/build"            : true,
            "havok/composer.json"    : true,
            "havok/vendor/less/lib"  : true
        };
        return (mid in list) ||
            lessLibRe.test(mid) ||
            buildResourceRe.test(mid) ||
            docsResourceRe.test(mid);
    };

    var test = function(filename, mid){
        var list = {
            "havok/test"     : true,
            "havok/phpunit.xml.dist" : true,
            "havok/selenium" : true
        };
        return (mid in list) ||
            testResourceRe.test(mid);
    };

    var copyOnly = function(filename, mid){
        if (mid == 'havok/vendor/less/less'){
            return true;
        }
        var list = {
	        "havok/havok.profile"  : true,
            "havok/package.json" : true,
            "havok/vendor/less/dist/less" : true
        };
        return (mid in list) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    var miniExclude = function(filename, mid){
        var list = {
            "havok/CHANGELOG.md" : true,
            "havok/README.md"    : true
        };
        return (mid in list);
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