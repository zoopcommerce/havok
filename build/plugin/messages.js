define(['./text'], function(text) {

    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){
            result = text.start('mystique-common/translations/messages.json', referenceModule, bc);
            result.push(bc.amdResources['mystique/messages']);
            
            return result;
        }
    };
});
