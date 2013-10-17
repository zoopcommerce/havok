define(["dojo/json", "dojo/_base/array", "util/build/fs"], function(json, array, fs){
    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){
            // mid may contain a pragma (e.g. "!strip"); remove
            var item,
                pieces = mid.split('!');

            mid = pieces[0];

            if (pieces.length > 1){
                item = json.parse(pieces[1], true);
            } else {
                item = {rank: 2};
            }

            var lessPlugin = bc.amdResources["havok/less"],
                moduleInfo = bc.getSrcModuleInfo(mid, referenceModule, true),
                lessResource = bc.resources[moduleInfo.url],
                i;

            if (!lessPlugin){
                throw new Error("havok/less! plugin missing");
            }
            if (!lessResource){
                throw new Error("less resource (" + moduleInfo.url + ") missing");
            }

            if (!referenceModule.less) {
                referenceModule.less = [];
            }
            
            referenceModule.less.push({
                module:lessResource,
                pid:moduleInfo.pid,
                mid:moduleInfo.mid,
                lessConfig: item
            });
            
            return [lessPlugin];
        }
    };
});
