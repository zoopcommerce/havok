// Dojo Configuration
dojoConfig = {
    async: true,
    baseUrl: "../../",
    packages: [
        {
            name: "dojo",
            location: "vendor/dojo/dojo"
        },
        {
            name: "dijit",
            location: "vendor/dojo/dijit"
        },
        {
            name:'util',
            location:'vendor/dojo/util'
        },
        {
            name:'build',
            location:'vendor/dojo/util/build'
        },
        {
            name:'doh',
            location:'vendor/dojo/util/doh'
        },
        {
            name: "havok",
            location: "vendor/dojo/havok"
        },
        {
            name: "mystique",
            location: "vendor/dojo/mystique"
        }
    ]
};

require('../../../../vendor/dojo/dojo/dojo');
