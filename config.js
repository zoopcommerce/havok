define(
    [],
    function(){
        //This file will merge all the standard havok configs in one go.
        return {
            merge: [
                'havok/validator/config',
                'havok/filter/config',
                'havok/exception/config',
                'havok/router/config',
                'havok/store/config',
                'havok/widget/config'
            ],

            less: {
                "havok/vendor/bootstrap/less/variables.less": {defs: true},
                "havok/vendor/bootstrap/less/mixins.less": {defs: true},

                "havok/vendor/bootstrap/less/reset.less": {rank: 1},
                "havok/vendor/bootstrap/less/scaffolding.less": {rank: 1},
                "havok/vendor/bootstrap/less/grid.less": {rank: 1},
                "havok/vendor/bootstrap/less/layouts.less": {rank: 1},
                "havok/vendor/bootstrap/less/type.less": {rank: 1},
                "havok/vendor/bootstrap/less/code.less": {rank: 1},
                "havok/vendor/bootstrap/less/forms.less": {rank: 1},
                "havok/vendor/bootstrap/less/tables.less": {rank: 1},
                "havok/vendor/bootstrap/less/utilities.less": {rank: 1},

                "havok/vendor/bootstrap/less/responsive-utilities.less": {rank: 3},
                "havok/vendor/bootstrap/less/responsive-1200px-min.less": {rank: 3},
                "havok/vendor/bootstrap/less/responsive-768px-979px.less": {rank: 3},
                "havok/vendor/bootstrap/less/responsive-767px-max.less": {rank: 3},
                "havok/vendor/bootstrap/less/responsive-navbar.less": {rank: 3},

                "havok/vendor/font-awesome/less/variables.less": {defs: true},
                "havok/vendor/font-awesome/less/mixins.less": {defs: true},

                "havok/vendor/font-awesome/less/path.less": {rank: 1},
                "havok/vendor/font-awesome/less/core.less": {rank: 1},
                "havok/vendor/font-awesome/less/bootstrap.less": {rank: 1},
                "havok/vendor/font-awesome/less/extras.less": {rank: 1},
                "havok/vendor/font-awesome/less/icons.less": {rank: 1}
            }
        }
    }
);
