define([],
function(){
    // module:
    //		havok/config

    return {
        // summary:
        //		Default havok config
        // description:
        //      This module can be used by [havok/config/manager](../config/manager.html) to provide default havok configuration.
        //      This will merge all the separate havok config files and create all the default havok settings.

        // deps: String[]
        //      An array of modules for `havok/deps` to load.
        deps: [
            'havok/router/started!',
            'havok/less!',
            'havok/parser/complete!',
            'havok/exception/started!'
        ],

        // merge: String[]
        //      An array of modules for `havok/config/manager` to load and merge.
        merge: [
            'havok/parser/config',
            'havok/router/config',
            'havok/widget/config'
        ],

        // less: Object|Boolean
        //      A mapping of less modules to load and parse.
        //      If set to `false`, client side less parsing is disabled.
        less: {
            "havok/less/havok-defs.less" : {defs: true},
            "havok/less/havok-rank1.less": {rank: 1},
            "havok/less/havok-rank3.less": {rank: 3}
        }
    }
});
