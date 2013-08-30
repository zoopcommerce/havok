var profile = {
    basePath:"../../../",
    releaseDir:"havok/docs/temp",
    //layerOptimize: 0, //uncomment this line if you want to debug the built docs, and then rebuild - the havokdocs.js layer will not be compressed
    defaultConfig: {
        merge: [
            'havok/config',
            'havok/docs/module/config'
        ]
    },
    localeList: ['en-gb', 'en-us'],
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "havok/havokdocs":{
            includeLocales: ['en-gb', 'en-us'],
            include: [
                'havok/main',
                'havok/docs/module/Formspy',
                'havok/docs/module/Controller',
                'havok/docs/module/MultiFieldValidator',
                'havok/docs/module/state',
                'havok/exception/renderer/Store',
                'havok/exception/renderer/UI'
            ],
            boot: 1
        }
    }
}
