var profile = {
    releaseDir:"../../docs/release",
    distDir:"../../docs/dist",
    //layerOptimize: 0, //uncomment this line if you want to debug the built docs, and then rebuild - the havokdocs.js layer will not be compressed
    defaultConfig: {
        merge: [
            'havok/config',
            'docs/config'
        ]
    },
    localeList: ['en-gb', 'en-us'],
    layers:{
        "docs/docs":{
            includeLocales: ['en-gb', 'en-us'],
            include: [
                'havok/*',
                'docs/*'
            ],
            boot: 1
        }
    }
}
