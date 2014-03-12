var profile = {
    releaseDir:"../../docs/release",
    distDir:"../../docs/dist",
    defaultConfig: {
        merge: [
            'havok/config',
            'docs/config'
        ]
    },
    localeList: ['en-gb', 'en-us'],
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "docs/docs":{
            includeLocales: ['en-gb', 'en-us'],
            include: [
                'havok/*',
                'docs/*',
                'mystique/Alpha',
                'mystique/Length'
            ],
            boot: 1
        }
    },
    packages:[
        {
            name: "docs",
            location: '../../docs/client'
        }
    ]
}
