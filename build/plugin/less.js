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

			var result = [lessPlugin];
			if(bc.internStrings && !bc.internSkip(moduleInfo.mid, referenceModule)){
				result.push({
					module:lessResource,
					pid:moduleInfo.pid,
					mid:moduleInfo.mid,
					deps:[],
                    lessConfig: item,
					internStrings:function(){
						return ["url:" + this.mid, "'//skip'"];
					}
				});

                //add all the less defined in config
                if (bc.defaultConfig.less){
                    for (i in bc.defaultConfig.less){
                        moduleInfo = bc.getSrcModuleInfo(i, referenceModule, true);
                        lessResource = bc.resources[moduleInfo.url];

                        result.push({
                            module:lessResource,
                            pid:moduleInfo.pid,
                            mid:moduleInfo.mid,
                            deps:[],
                            lessConfig: bc.defaultConfig.less[i],
                            internStrings:function(){
                                return ["url:" + this.mid, "'//skip'"];
                            }
                        });
                    }
                }
			}
			return result;
		}
	};
});
