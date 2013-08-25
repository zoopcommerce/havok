var profile = {
    basePath:"../../../",
    releaseDir:"havok/temp",
    defaultConfig: {
        merge: [
            'havok/config'
        ]
    },
    localeList: ['en-gb', 'en-us'],		
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "havok/havok":{
            includeLocales: ['en-gb', 'en-us'],
            include: [
                'havok/main'
            ],
            boot: 1
        }
    }
}
