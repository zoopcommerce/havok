define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    '../string',
    'dojo/dom-class',
    'dijit/focus',
    './Tooltip',
    './_WidgetBase',
    './_WidgetsInTemplateMixin',
    'dojo/text!./template/TextToolbar.html',
    '../less!./less/text-toolbar.less',
    './ButtonGroup',
    './DropdownToggle',
    './Dropdown',
    './DropdownContainer',
    './ToggleButton',
    '../form/TextBox'
],
function (
    declare,
    lang,
    array,
    on,
    dom,
    domConstruct,
    string,
    domClass,
    focus,
    Tooltip,
    WidgetBase,
    WidgetsInTemplateMixin,
    template
){
    // module:
    //    	havok/widget/TextToolbar

    return declare(
        [WidgetBase, WidgetsInTemplateMixin],
        {
            // summary:
            //      Widget to display a text editor toolbar

            // templateString: String
            templateString: template,

            /*=====
            // _tooltips: Tooltip[]
            //      Array of tooltip widgets
            _tooltips: undefined,
            =====*/

            /*=====
            // _events: Object[]
            //      Array of event handlers
            _events: undefined,
            =====*/

            /*=====
            // target: DomNode
            //      The dom node with text that is edited by this toolbar
            target: undefined,
            =====*/

            // _toggleCommands: String[]
            //      Toolbar commands that use a toggle button
            _toggleCommands: [
                'bold',
                'italic',
                'strikeThrough',
                'underline',
                'insertOrderedList',
                'insertUnorderedList',
                'justifyleft',
                'justifycenter',
                'justifyright',
                'justifyfull'
            ],

            // _buttonCommands: String[]
            //      Toolbar commands that use a button
            _buttonCommands: [
                'outdent',
                'indent',
                'unlink',
                'undo',
                'redo'
            ],

            // _groups: String[]
            //      Groups that toolbar commands are grouped into
            _groups: [
                'font',
                'fontSize',
                'style',
                'align',
                'tab',
                'list',
                'link',
                'correct',
                'viewGroup'
            ],

            // view: String
            //      Currently active view. Possible values are `wysiwig|source`.
            //      Defaults to `wysiwig`.
            view: 'wysiwig', // wysiwig | source

            startup: function(){

                this.inherited(arguments);

                if (typeof this.target == 'string'){
                    this.target = dom.byId(this.target);
                }

                document.execCommand('styleWithCSS', 0, true);

                this._parseComplete.then(lang.hitch(this, function(){

                    this._tooltips = array.map([
                        {target: this.font, title: 'Font'},
                        {target: this.fontSize, title: 'Font Size'},
                        {target: this.bold, title: 'Bold (ctrl + b)'},
                        {target: this.italic, title: 'Italic (ctrl + i)'},
                        {target: this.strikeThrough, title: 'Strikethrough'},
                        {target: this.underline, title: 'Underline (ctrl + u)'},
                        {target: this.insertUnorderedList, title: 'Bullet List'},
                        {target: this.insertOrderedList, title: 'Number List'},
                        {target: this.outdent, title: 'Reduce Indent (shift + tab)'},
                        {target: this.indent, title: 'Indent (tab)'},
                        {target: this.justifyleft, title: 'Align Left (ctrl + l)'},
                        {target: this.justifycenter, title: 'Center (ctrl + e)'},
                        {target: this.justifyright, title: 'Align Right (ctrl + r)'},
                        {target: this.justifyfull, title: 'Justify (ctrl + j)'},
                        {target: this.createLinkDropdown, title: 'Hyperlink'},
                        {target: this.unlink, title: 'Remove Hyperlink'},
                        {target: this.undo, title: 'Undo (ctrl + z)'},
                        {target: this.redo, title: 'Redo (ctrl + y)'},
                        {target: this.source, title: 'View source'},
                        {target: this.more, title: 'More'}
                    ], function(item){
                        return new Tooltip({target: item.target.domNode, title: item.title});
                    })
                    array.forEach(this._tooltips, function(tooltip){tooltip.startup()});

                    this._events = [
                        on(window, 'resize', lang.hitch(this, function(){
                            this._resize();
                        })),
                        on(this.target, 'mouseup, keyup', lang.hitch(this, function(){
                            this.saveSelection();
                            this.updateToolbar();
                        })),
                        this.font.on('item-click', lang.hitch(this, function(e){
                            this.font.hide();
                            this.execCommand('fontName', e.item.getAttribute('data-havok-store-id').slice(3));
                        })),
                        this.moreFont.on('item-click', lang.hitch(this, function(e){
                            this.more.hide();
                            this.execCommand('fontName', e.item.getAttribute('data-havok-store-id').slice(3));
                        })),
                        this.fontSize.on('item-click', lang.hitch(this, function(e){
                            this.fontSize.hide();
                            //TODO: this line is a little nuts. Should simplify
                            this.fontSize.dropdown.store.get(e.item.getAttribute('data-havok-store-id').slice(3)).then(lang.hitch(this, function(data){
                                this.execCommand('fontSize', data.size);
                            }))
                        })),
                        this.moreFontSize.on('item-click', lang.hitch(this, function(e){
                            this.more.hide();
                            this.fontSize.dropdown.store.get(e.item.getAttribute('data-havok-store-id').slice(3)).then(lang.hitch(this, function(data){
                                this.execCommand('fontSize', data.size);
                            }))
                        })),
                        on(this.createLink, 'click', lang.hitch(this, function(){
                            this.createLinkDropdown.hide();
                            this.execCommand('createLink', this.createLinkTextBox.get('value'));
                        })),
                        on(this.moreCreateLink, 'click', lang.hitch(this, function(){
                            this.more.hide();
                            this.execCommand('createLink', this.moreCreateLinkTextBox.get('value'));
                        })),
                        this.more.on('item-click', lang.hitch(this, function(){
                            this.more.hide();
                        })),
                        on(this.source, 'click', lang.hitch(this, function(){
                            if (this.source.get('active')) {
                                this.set('view', 'source');
                            } else {
                                this.set('view', 'wysiwig');
                            }
                        })),
                        on(this.moreSource, 'click', lang.hitch(this, function(){
                            this.more.hide();
                            if (this.view == 'source') {
                                this.set('view', 'wysiwig');
                            } else {
                                this.set('view', 'source');
                            }
                        }))
                    ];

                    array.forEach(this._buttonCommands, lang.hitch(this, function(command){
                        this[command].set('keyTarget', this.target);
                        this[command].command = command;
                        this._events.push(
                            this[command].on('click', lang.hitch(this, function(){
                                this.execCommand(command);
                            }))
                        );
                        this._events.push(
                            on(this['more' + string.ucFirst(command)], 'click', lang.hitch(this, function(){
                                this.more.hide();
                                this.execCommand(command);
                            }))
                        );
                    }));

                    array.forEach(this._toggleCommands, lang.hitch(this, function(command){
                        this[command].set('keyTarget', this.target);
                        this[command].command = command;
                        this._events.push(
                            this[command].on('click', lang.hitch(this, function(){
                                this.execCommand(command, this[command].get('active'));
                            }))
                        );
                        this._events.push(
                            on(this['more' + string.ucFirst(command)], 'click', lang.hitch(this, function(){
                                this.more.hide();
                                this[command].toggle();
                                this.execCommand(command, this[command].get('active'));
                            }))
                        );
                    }));

                    //add source view node
                    this.sourceView = domConstruct.create(
                        'textarea',
                        {'class': 'hidden'},
                        this.target,
                        'after'
                    );

                    this._resize();
                }));
            },

            destroy: function(){
                array.forEach(this._tooltips, function(tooltip){
                    tooltip.destroy();
                })
                array.forEach(this._events, function(event){
                    event.remove();
                })
                this.inherited(arguments);
            },

            _resize: function(){

                if (this.source.get('active')) {
                    return;
                }

                var i,
                    node,
                    moreNode,
                    tooLong = lang.hitch(this, function(){
                        domClass.remove(this.more.domNode, 'hidden');
                        for (i = this._groups.length - 1; i >= 0; i--){
                            node = this[this._groups[i]].domNode;
                            if (!domClass.contains(node, 'hidden')){
                                domClass.add(node, 'hidden');
                                if (this.domNode.offsetWidth < this.domNode.parentNode.offsetWidth){
                                    break;
                                }
                            }
                        }
                    }),
                    tooShort = lang.hitch(this, function(){
                        domClass.add(this.more.domNode, 'hidden');
                        for (i = 0; i < this._groups.length; i++){
                            node = this[this._groups[i]].domNode;
                            if (domClass.contains(node, 'hidden')){
                                domClass.remove(node, 'hidden');
                                if (this.domNode.offsetWidth > this.domNode.parentNode.offsetWidth){
                                    tooLong();
                                    break;
                                }
                            }
                        }
                    });

                if (this.domNode.offsetWidth > this.domNode.parentNode.offsetWidth){
                    //toolbar too long
                    tooLong();
                } else {
                    //toolbar too short
                    tooShort();
                }

                if (!domClass.contains(this.more.domNode, 'hidden')){
                    for (i = 0; i < this._groups.length; i++){
                        node = this[this._groups[i]].domNode;
                        moreNode = this['more' + string.ucFirst(this._groups[i])].domNode;
                        if (domClass.contains(node, 'hidden')){
                            domClass.remove(moreNode, 'hidden');
                        } else {
                            domClass.add(moreNode, 'hidden');
                        }
                    }
                }
            },

            _setViewAttr: function(value) {
                if (value == 'source') {
                    this.sourceView.value = string.trim(this.target.innerHTML);
                    for (var i = 0; i < this._groups.length; i++){
                        domClass.add(this[this._groups[i]].domNode, 'hidden');
                    }
                    domClass.remove(this.viewGroup.domNode, 'hidden');
                    domClass.add(this.more.domNode, 'hidden');
                    domClass.remove(this.sourceView, 'hidden');
                    domClass.add(this.sourceView, 'text-editor-source');
                    domClass.add(this.target, 'hidden');
                    this.source.set('active', true);
                    focus.focus(this.sourceView);
                } else if (this._started) {
                    this.target.innerHTML = this.sourceView.value;
                    domClass.remove(this.sourceView, 'text-editor-source');
                    domClass.add(this.sourceView, 'hidden');
                    domClass.remove(this.target, 'hidden');
                    this.source.set('active', false);
                    this._resize();
                    focus.focus(this.target);
                }
                this._set('view', value);
            },

            execCommand: function(command, args){
                this.restoreSelection();
                focus.focus(this.target);
                document.execCommand(command, 0, args);
                this.saveSelection();
                this.updateToolbar();
            },

            updateToolbar: function() {
                array.forEach(this._toggleCommands, lang.hitch(this, function(command){
                    this[command].set('active', document.queryCommandState(command));
                }));
                this.source.set('active', this.view == 'source');
            },

            getCurrentRange: function() {
                var selection = window.getSelection();
                if (selection.getRangeAt && selection.rangeCount) {
                    return selection.getRangeAt(0);
                }
            },

            saveSelection: function() {
                this.selectedRange = this.getCurrentRange();
            },

            restoreSelection: function() {
                if (this.selectedRange) {
                    if (this.getCurrentRange() !== this.selectedRange){
                        var selection = window.getSelection();
                        try {
                            selection.removeAllRanges();
                        } catch (ex) {
                            document.body.createTextRange().select();
                            document.selection.empty();
                        }
                        selection.addRange(this.selectedRange);
                    }
                }
            }
        }
    );
});
