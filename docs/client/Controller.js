define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/request/xhr',
    'dojo/Deferred',
    'dojo/dom-construct',
    '../../parser/parser',
    'dijit/registry',
    '../../exception/Application',
    '../../parser/complete!'
],
function(
    declare,
    lang,
    array,
    xhr,
    Deferred,
    domConstruct,
    parser,
    registry,
    Application
){
    return declare([],
        {
            //node: undefined,

            constructor: function(){
                this.node = document.body.querySelector('main');
                this.overlay = registry.byNode(document.body.querySelector('.main-overlay'));
                this.cache = {};
            },

            go: function(){
                //if the node is full, it must be first load
                if (this.node.children.length > 0){
                    this._setActiveNav(window.location.href);
                    return;
                }

                var href = window.location.href;
                if (href.slice(-1) == '/'){
                    //default to index.html
                    href = href + 'index.html';
                }

                this.load(href.replace('.html', '-content.html')).then(lang.hitch(this, function(html){
                    this.node.innerHTML = html;
                    window.scrollTo(0,0);
                    this._setActiveNav(href);

                    //parse the new content
                    parser.parse(this.node).then(lang.hitch(this, function(){
                        //run any embedded scripts - shouldn't have any in a production site, but the docs examples do use them
                        array.forEach(this.node.getElementsByTagName('SCRIPT'), function(node){
                            eval.call(window, node.innerHTML);
                        });

                        //hide overlay
                        this.overlay.hide();
                    }))
                }))
            },

            exit: function(){
                array.forEach(registry.findWidgets(this.node), function(widget){
                    widget.destroyRecursive()
                });
                domConstruct.empty(this.node);
                this.overlay.show();
            },

            load: function(src){

                var result = new Deferred;
                if (this.cache[src]){
                    result.resolve(this.cache[src]);
                } else {
                    xhr(src, {}).then(lang.hitch(this, function(data){
                        // Do something with the handled data
                        this.cache[src] = data;
                        result.resolve(data);
                    }), function(err){
                        // Handle the error condition
                        throw new Application('404 page not found');
                    });
                }

                return result;
            },

            _setActiveNav: function(href){
                var topNav = registry.byId('topNav'),
                    i;

                if (href.slice(-1) == '/'){
                    //default to index.html
                    href = href + 'index';
                } else {
                    href = href.slice(0, -5); //remove the .html extension
                }

                for (i = 0; i < topNav.containerNode.children.length; i++){
                    if (href.indexOf(topNav.containerNode.children[i].firstElementChild.href.slice(0, -5)) == 0){
                        topNav.set('active', topNav.containerNode.children[i]);
                        document.title = topNav.containerNode.children[i].firstElementChild.innerHTML + ' | Havok by Zoop';
                        break;
                    }
                }
            }
        }
    );
});
