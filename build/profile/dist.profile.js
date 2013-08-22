var profile = {
    basePath:"../../../",
    releaseDir:"havok/temp",
    defaultConfig: {
        merge: [
            'havok/config'
        ]
    },
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "havok/havok":{
            includeLocales: ['en-us'],
            include: [
                'havok/main'
            ],
            boot: 1
        }
    }
}
