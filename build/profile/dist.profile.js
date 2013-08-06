var profile = {
    "basePath":"../../../../../",
    "releaseDir":"public/prod-assets",
    "action":"release",
    "cssOptimize":"comments",
    "layerOptimize":"closure",
    "stripConsole":"all",
    "selectorEngine":"acme",
    "mini":0,
    locale: 'en-au',
    defaultConfig: {
        hasCache:{
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "acme"
        },
        popup: true,
        async: true,
        debug: false,
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
