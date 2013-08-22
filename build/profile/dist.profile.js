var profile = {
    action:"release",
    basePath:"../../../",
    releaseDir:"release",
    layerOptimize:"closure",
    selectorEngine:"lite",
    mini:1,
    buildReportDir: ".",
    buildReportFilename: "build-report.txt",
    defaultConfig: {
        hasCache:{
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "lite"
        },
        async: true,
        merge: [
            'havok/config'
        ]
    },
    timestampLayers: true,
    "packages":[
    {
        "name":"dojo",
        "location":"vendor/dojo/dojo"
    },
    {
        "name":"dijit",
        "location":"vendor/dojo/dijit"
    },
    {
        "name":"havok",
        "location":"vendor/dojo/havok"
    }
    ],
    "layers":{
        "havok/havok":{
            "custombase":true,
            "boot":true
        }
    }
}
