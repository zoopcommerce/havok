dojoConfig = {
    async: true,
    baseUrl: __dirname + "/../../../",
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
            name: "havok",
            location: "havok"
        },
        {
            name: "mystique",
            location: "mystique"
        },
        {
            name: "mystique-common",
            location: "mystique-common"
        }
    ],
    locale: 'en-au',
    merge: [
        'havok/config',
        'havok/docs/client/config'
    ],
    less: false
};

var parser = require('../../dom-lite/parser'),
    nodeType = require('../../dom-lite/nodeType');

exports.render = function(rawHtml, callback){
    parser.parse(rawHtml, function(dom){

        //add globals needed by dojo expecting a dom
        document = dom;
        addEventListener = function(){};
        navigator = {};
        window = document.defaultView;

        var renderedHead = document.head ? document.head.outerHTML : '';

        require('../../vendor/prettify/prettify');
        window['PR_SHOULD_USE_CONTINUATION'] = false; //ensures that pretty printing is sync rather than async
        window.prettyPrint();
        delete require.cache[require.resolve('../../vendor/prettify/prettify')]; //make sure that prettify reloads each request

        require('../../../dojo/dojo');
        delete require.cache[require.resolve('../../../dojo/dojo')]; //make sure that dojo reloads each request

        global.require(['dojo/has', 'havok/parser/parser'], function(has, parser){

            has.add("dom-addeventlistener", !!document.addEventListener);
            has.add("dom-attributes-explicit", true);

            parser.parse(document.body || document, {startup: false}).then(function(){
                var renderedBody = document.body ? document.body.outerHTML : '',
                    node,
                    result = [];

                document.childNodes.forEach(function(node){
                    if (node.tagName == '!doctype'){
                        result.push('<' + node.nodeValue + '>');
                    } else if (node.tagName == 'HTML'){
                        result.push('<html ');
                        node.attributes.forEach(function(attr){
                            result.push(attr.name);
                            result.push('="');
                            result.push(attr.value);
                            result.push('" ');
                        });
                        result.push('>');
                        result.push(renderedHead);
                        result.push(renderedBody);
                        result.push('</html>');
                    } else if (node.nodeType == nodeType.Tag){
                        result.push(node.outerHTML);
                    }
                })

                //cleanup
                delete global.require;
                delete global.define;

                callback(result.join(''));
            })
        });
    })
}