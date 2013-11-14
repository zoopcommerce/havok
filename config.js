define(
    [],
    function(){
        //This file will merge all the standard havok configs in one go.
        return {
            bootstrap: [
                'havok/less!',
                'havok/parser/complete!'
            ],
            merge: [
                'havok/validator/config',
                'havok/filter/config',
                'havok/exception/config',
                'havok/parser/config',
                'havok/router/config',
                'havok/store/config',
                'havok/widget/config'
            ],

            less: {
                "havok/less/havok-defs.less" : {defs: true},
                "havok/less/havok-rank1.less": {rank: 1},
                "havok/less/havok-rank3.less": {rank: 3}
            }
        }
    }
);
