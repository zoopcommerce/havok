define(['dojo/_base/lang', 'build/buildControl'], function(lang, bc) {

    return function extractDepsFromDiConfig(identifier){
        var mids = [];
        var diConfig = bc.defaultConfig.di;
        var config;
        var index;

        switch(true){
            case (typeof(identifier) == 'string') &&
                Boolean(diConfig[identifier]) &&
                Boolean(diConfig[identifier].base):
                //string identifier, with config and explicit base
                //extractMids from base and gets
                config = diConfig[identifier];
                mids = mids.concat(extractDepsFromDiConfig(config.base));
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractDepsFromDiConfig(config.gets[index]));
                    }
                }
                break;
            case typeof(identifier) == 'string' &&
                Boolean(diConfig[identifier]):
                //string identifier, with config and implicit base
                //assume the identifier is a mid, and add it. Then extractMids from gets
                config = diConfig[identifier];
                mids.push(bc.amdResources[identifier]);
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractDepsFromDiConfig(config.gets[index]));
                    }
                }
                break;
            case typeof(identifier) == 'string' && identifier.split('!').length > 1:
                //string identifier with no config and ! - means it is an AMD plugin
                var pieces = identifier.split('!');
                var plugin = pieces[0];
                pieces.shift;
                var arg = pieces.join('!');

                if (bc.plugins[plugin]){
                    mids = mids.concat(bc.plugins[plugin].start(arg, null, bc));
                }
                break;
            case typeof(identifier) == 'string':
                //string identifier with no config - just plain mid
                //add the mid and return
                mids.push(bc.amdResources[identifier]);
                break;
            case lang.isArray(identifier):
                //identifier is an array of identifiers. Process each one individually.
                for (index in identifier){
                    mids = mids.concat(extractDepsFromDiConfig(identifier[index]));
                }
                break;
            case typeof(identifier) == 'object' && identifier.base:
                //inline config object
                //extractMid from base and gets
                config = identifier;
                mids = mids.concat(extractDepsFromDiConfig(config.base));
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractDepsFromDiConfig(config.gets[index]));
                    }
                }
                break;
            case typeof(identifier) == 'object':
                //just a plain base object. Do nothing
                break;
        }

        return mids;
    }
});
