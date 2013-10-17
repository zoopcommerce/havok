define([], function(){
    //sensible build profile default settings
return {
    action:"release",
    releaseDir:"release",
    layerOptimize:"closure",
    selectorEngine:"lite",
    mini:1,
    buildReportDir: ".",
    buildReportFilename: "build-report.txt",
    insertAbsMids: 0,
    defaultConfig: {
        hasCache:{
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "lite"
        },
        async: true
    },
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
        },
        {
            name:"mystique-common",
            location:"mystique-common"
        }
    ],
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
        'config-deferredInstrumentation': 0,
        'config-stripStrict': 0,
        'dojo-timeout-api': 0,
        'dojo-dom-ready-api': 0,
        'dojo-log-api': 0,
        'dojo-amd-factory-scan': 0,
        'dojo-publish-privates': 0,
        'dojo-debug-messages': 0
    },
    plugins: {
        "havok/config/ready":"havok/build/plugin/config/ready",
        "havok/router/baseUrl":"havok/build/plugin/router/baseUrl",
        "havok/router/started":"havok/build/plugin/router/started",
        "havok/di/sharedDi":"havok/build/plugin/di/sharedDi",
        "havok/proxy":"havok/build/plugin/proxy",
        "havok/get":"havok/build/plugin/get",
        "havok/less":"havok/build/plugin/less",
        "mystique/messages":"havok/build/plugin/messages",
        "dojo/text":"havok/build/plugin/text"
    },
    transforms: {
        writeAmd: ["havok/build/transforms/writeAmd", "write"]
    }
}
});