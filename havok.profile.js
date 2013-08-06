var profile = (function(){
    var testResourceRe = /^havok\/test\//;
    var buildResourceRe = /^havok\/build\//;
    var seleniumResourceRe = /^havok\/selenium\//;
    var travisResourceRe = /^havok\/.travis\//;
    var docsResourceRe = /^havok\/docs\//;

    var ignore = function(filename, mid){
        var list = {
            "havok/docs"             : true,
            "havok/build"            : true,
            "havok/.travis"          : true
        };
        return (mid in list) ||
            buildResourceRe.test(mid) ||
            travisResourceRe.test(mid) ||
            docsResourceRe.test(mid);
    };

    var test = function(filename, mid){
        var list = {
            "havok/test"     : true,
            "havok/phpunit.xml.dist" : true,
            "havok/selenium" : true
        };
        return (mid in list) ||
            testResourceRe.test(mid) ||
            seleniumResourceRe.test(mid);
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
            "havok/README.md"    : true
        };
        return (mid in list);
    };

    return {
        resourceTags:{

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