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
                "havok/vendor/bootstrap/less/variables.less": {includeAlways: true},
                "havok/vendor/bootstrap/less/mixins.less": {includeAlways: true},

                "havok/vendor/bootstrap/less/reset.less": {block: 1},
                "havok/vendor/bootstrap/less/scaffolding.less": {block: 1},
                "havok/vendor/bootstrap/less/grid.less": {block: 1},
                "havok/vendor/bootstrap/less/layouts.less": {block: 1},
                "havok/vendor/bootstrap/less/type.less": {block: 1},
                "havok/vendor/bootstrap/less/code.less": {block: 1},
                "havok/vendor/bootstrap/less/forms.less": {block: 1},
                "havok/vendor/bootstrap/less/tables.less": {block: 1},
                "havok/vendor/bootstrap/less/utilities.less": {block: 1},

                "havok/vendor/bootstrap/less/responsive-utilities.less.": {block: 3},
                "havok/vendor/bootstrap/less/responsive-1200px-min.less": {block: 3},
                "havok/vendor/bootstrap/less/responsive-768px-979px.less": {block: 3},
                "havok/vendor/bootstrap/less/responsive-767px-max.less": {block: 3},
                "havok/vendor/bootstrap/less/responsive-navbar.less": {block: 3},

                "havok/vendor/font-awesome/less/variables.less": {includeAlways: true},
                "havok/vendor/font-awesome/less/mixins.less": {includeAlways: true},
                
                "havok/vendor/font-awesome/less/path.less": {block: 1},
                "havok/vendor/font-awesome/less/core.less": {block: 1},
                "havok/vendor/font-awesome/less/bootstrap.less": {block: 1},
                "havok/vendor/font-awesome/less/extras.less": {block: 1},
                "havok/vendor/font-awesome/less/icons.less": {block: 1}
            }
        }
    }
);
