define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom',
    '../string',
    'dojo/dom-class',
    'dijit/focus',
    './Tooltip',
    './_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./template/TextToolbar.html',
    './ButtonGroup',
    './DropdownToggle',
    './Dropdown',
    './DropdownContainer',
    '../form/TextBox',
    '../less!./less/text-toolbar.less'
],
function (
    declare,
    lang,
    array,
    on,
    dom,
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

            templateString: template,

            //tooltips: undefined,

            //events: undefined,

            //target: undefined,

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

            _buttonCommands: [
                'outdent',
                'indent',
                'unlink',
                'undo',
                'redo'
            ],

            _groups: [
                'font',
                'fontSize',
                'style',
                'align',
                'tab',
                'list',
                'link',
                'correct'
            ],

            buildRendering: function(){
                this.inherited(arguments);

                if (typeof this.target == 'string'){
                    this.target = dom.byId(this.target);
                }

                this.tooltips = array.map([
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
                    {target: this.more, title: 'More'}
                ], function(item){
                    return new Tooltip({target: item.target.domNode, title: item.title});
                })
            },

            startup: function(){

                this.inherited(arguments);

                array.forEach(this.tooltips, function(tooltip){tooltip.startup()});

                document.execCommand('styleWithCSS', 0, true);

                this._resize();

                this.events = [
                    on(window, 'resize', lang.hitch(this, function(){
                        this._resize();
                    })),
                    on(this.target, 'mouseup, keyup', lang.hitch(this, function(){
                        this.saveSelection();
                        this.updateToolbar();
                    })),
                    this.font.on('item-click', lang.hitch(this, function(item){
                        this.font.hide();
                        this.execCommand('fontName', item.id);
                    })),
                    this.moreFont.on('item-click', lang.hitch(this, function(item){
                        this.more.hide();
                        this.execCommand('fontName', item.id);
                    })),
                    this.fontSize.on('item-click', lang.hitch(this, function(item){
                        this.fontSize.hide();
                        this.execCommand('fontSize', item.size);
                    })),
                    this.moreFontSize.on('item-click', lang.hitch(this, function(item){
                        this.more.hide();
                        this.execCommand('fontSize', item.size);
                    })),
                    on(this.createLink, 'click', lang.hitch(this, function(){
                        this.createLinkDropdown.hide();
                        this.execCommand('createLink', this.createLinkTextBox.get('value'));
                    })),
                    on(this.moreCreateLink, 'click', lang.hitch(this, function(){
                        this.more.hide();
                        this.execCommand('createLink', this.moreCreateLinkTextBox.get('value'));
                    })),
                    this.more.on('item-click', lang.hitch(this, function(item){
                        this.more.hide();
                    }))
                ];

                array.forEach(this._buttonCommands, lang.hitch(this, function(command){
                    this[command].set('keyTarget', this.target);
                    this[command].command = command;
                    this.events.push(
                        this[command].on('click', lang.hitch(this, function(){
                            this.execCommand(command);
                        }))
                    );
                    this.events.push(
                        on(this['more' + string.ucFirst(command)], 'click', lang.hitch(this, function(){
                            this.more.hide();
                            this.execCommand(command);
                        }))
                    );
                })),

                array.forEach(this._toggleCommands, lang.hitch(this, function(command){
                    this[command].set('keyTarget', this.target);
                    this[command].command = command;
                    this.events.push(
                        this[command].on('click', lang.hitch(this, function(){
                            this.execCommand(command, this[command].get('active'));
                        }))
                    );
                    this.events.push(
                        on(this['more' + string.ucFirst(command)], 'click', lang.hitch(this, function(){
                            this.more.hide();
                            this[command].toggle();
                            this.execCommand(command, this[command].get('active'));
                        }))
                    );
                }))
            },

            destroy: function(){
                array.forEach(this.tooltips, function(tooltip){
                    tooltip.destroy();
                })
                array.forEach(this.events, function(event){
                    event.remove();
                })
                this.inherited(arguments);
            },

            _resize: function(){

                var i,
                    node,
                    moreNode,
                    hide,
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
                }))
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
