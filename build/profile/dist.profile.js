var profile = {
    releaseDir:"../../release",
    distDir:"../../dist",
    defaultConfig: {
        merge: [
            'havok/config'
        ]
    },
    localeList: ['en-gb', 'en-us'],
    layers:{
        "havok/havok":{
            includeLocales: ['en-gb', 'en-us'],
            include: [
                'havok/*'
            ],
            boot: 1
        }
    }
}
