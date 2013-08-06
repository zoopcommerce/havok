define ([], function (){
    return {
        di: {
            'FilterFactory': {
                base: 'havok/filter/factory',
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
