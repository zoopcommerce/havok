define ([], function (){
    return {
        di: {
            'havok/validator/factory': {
                gets: {
                    di: 'havok/di/sharedDi!'
                }
            },
            'mystique/Chain': {
                directives: {
                    cache: false
                }
            }
        }
    };
});
