var profile = {
    action: "release",
    basePath: "../../../",
    releaseDir:"../../../builthavok20",
    cssOptimize:0,
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
    staticHasFeatures: {
        'dom': 1,
        'host-browser': 1,
        'dojo-inject-api': 1,
        'dojo-loader-eval-hint-url': 1,
        'dojo-built': 1,
        'host-node': 0,
        'host-rhino': 0,
        'dojo-trace-api': 0,
        'dojo-sync-loader': 0,
        'dojo-config-api': 1,
        'dojo-cdn': 0,
        'dojo-sniff': 0,
        'dojo-requirejs-api': 0,
        'dojo-test-sniff': 0,
        'dojo-combo-api': 0,
        'dojo-undef-api': 0,
        'config-tlmSiblingOfDojo': 0,
        'config-dojo-loader-catches': 0,
        'config-stripStrict': 0,
        'dojo-timeout-api': 0,
        'dojo-dom-ready-api': 0,
        'dojo-log-api': 0,
        'dojo-amd-factory-scan': 0,
        'dojo-publish-privates': 0
    },
    dojoBootText: "require.boot && require.apply(null, require.boot);",
    packages:[
        {
            name:"dojo",
            location:"dojo"
        },
        {
            name:"dijit",
            location:"dijit"
        },
        {
            name:"havok",
            location:"havok"
        },
        {
            name:"mystique",
            location:"mystique"
        }
    ],
    layers:{
        "dojo/dojo": {
            include: [],
            customBase: 1
        },
        "havok/test":{
            include: [
                'havok/main'
            ],
            boot: 1
        }
    }
}
