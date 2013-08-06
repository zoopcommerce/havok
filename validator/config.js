define ([], function (){
    return {
        di: {
            'ValidatorFactory': {
                base: 'havok/Validator/factory',
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
