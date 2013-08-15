// Dojo Configuration
dojoConfig = {
    async: true,
    baseUrl: "../../",
    packages: [
        {
            name: "dojo",
            location: "dojo"
        },
        {
            name: "dijit",
            location: "dijit"
        },
        {
            name:'util',
            location:'util'
        },
        {
            name:'build',
            location:'util/build'
        },
        {
            name:'doh',
            location:'util/doh'
        },
        {
            name: "havok",
            location: "havok"
        },
        {
            name: "mystique",
            location: "mystique"
        }
    ]
};

//have to load the less compiler before dojo because it doesn't play nice with dojo AMD
lessc = require('../../havok/vendor/less/lib/less');

require('../../dojo/dojo');
