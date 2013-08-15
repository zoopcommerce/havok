define ([], function (){
    return {
        di: {
            'havok/filter/factory': {
                gets: {
                    di: 'havok/di/sharedDi!'
                }
            },
            'havok/filter/Chain': {
                directives: {
                    cache: false
                }
            }
        }
    };
});
