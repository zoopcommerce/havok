var profile = {
    basePath:"../../../",
    releaseDir:"havok/docs/temp",
    defaultConfig: {
        merge: [
            'havok/config',
            'havok/docs/module/config'
        ]
    },
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "havok/havokdocs":{
            includeLocales: ['en-us'],
            include: [
                'havok/main',
                'havok/docs/module/Formspy',
                'havok/docs/module/Controller',
                'havok/docs/module/MultiFieldValidator',
                'havok/docs/module/state'
            ],
            boot: 1
        }
    }
}
