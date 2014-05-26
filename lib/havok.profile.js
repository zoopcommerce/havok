var profile = (function(){

    var less = function(filename, mid){
        var list = {};
        return (mid in list) ||
            /(less|css)$/.test(filename);
    };

    var ignore = function(filename, mid){
        return false;
    };

    var test = function(filename, mid){
        return false;
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
        return false;
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