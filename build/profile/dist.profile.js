var profile = {
    releaseDir:"../../temp",
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
            include: [/*make.js will include all havok modules here*/],
            boot: 1
        }
    }
}
