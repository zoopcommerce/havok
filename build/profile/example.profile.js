var profile = {
    releaseDir:"example", //this is the directory the built files will be placed in
    distDir:"dist", //build layers and layer css will be copied to this directory
    defaultConfig: { //set a default dojoConfig to be rolled into the build
        deps: [
            'havok/ready!'
        ],
        merge: [
            'havok/config' //any configs specified here will be merged by the havok build preprocessor
        ]
    },
    layers:{ //this defines layers
        "dojo/dojo": { //every build creates a dojo layer (that doesn't mean you have to use it)
            include: [], //nothing exta is included in the dojo layer
            customBase: 1 //even the dojo base is not included in the dojo layer. This makes this layer very slim - just the dojo AMD loader.
        },
        "havok/bootexample":{ //An example bootable layer
            includeLocales: ['en-us'], //locales to roll into the layer. If you don't add a locale it will be loaded async
            include: [ //these modules and all their dependencies will be inclued in the layer
                'havok/form/ValidationTextBox',
                'havok/widget/NavBar',
                'havok/widget/Affix',
                'dojo/parser'
            ],
            boot: 1 //make the layer bootable, that is, include the AMD loader in the layer
        },
        "havok/example":{ //An example non-bootable layer
            includeLocales: ['en-us'],
            include: [ //these modules and all their dependencies will be inclued in the layer
                'havok/form/TextEditor',
                'havok/widget/Modal'
            ],
            exclude: [
                'havok/bootexample' //Any dependencies common to with the havok/bootexample layer will not be included
            ]
        }
    }
}
