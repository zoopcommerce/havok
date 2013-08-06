define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
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

            buildRendering: function(){
                this.inherited(arguments);

                this.tooltips = [
                    new Tooltip({target: this.font.domNode, title: 'Font'}),
                    new Tooltip({target: this.fontSize.domNode, title: 'Font Size'}),

                    new Tooltip({target: this.bold.domNode, title: 'Bold (ctrl + b)'}),
                    new Tooltip({target: this.italic.domNode, title: 'Italic (ctrl + i)'}),
                    new Tooltip({target: this.strikeThrough.domNode, title: 'Strikethrough'}),
                    new Tooltip({target: this.underline.domNode, title: 'Underline (ctrl + u)'}),

                    new Tooltip({target: this.insertUnorderedList.domNode, title: 'Bullet List'}),
                    new Tooltip({target: this.insertOrderedList.domNode, title: 'Number List'}),
                    new Tooltip({target: this.outdent.domNode, title: 'Reduce Indent (shift + tab)'}),
                    new Tooltip({target: this.indent.domNode, title: 'Indent (tab)'}),

                    new Tooltip({target: this.justifyleft.domNode, title: 'Align Left (ctrl + l)'}),
                    new Tooltip({target: this.justifycenter.domNode, title: 'Center (ctrl + e)'}),
                    new Tooltip({target: this.justifyright.domNode, title: 'Align Right (ctrl + r)'}),
                    new Tooltip({target: this.justifyfull.domNode, title: 'Justify (ctrl + j)'}),

                    new Tooltip({target: this.createLinkDropdown.domNode, title: 'Hyperlink'}),
                    new Tooltip({target: this.unlink.domNode, title: 'Remove Hyperlink'}),

                    new Tooltip({target: this.undo.domNode, title: 'Undo (ctrl + z)'}),
                    new Tooltip({target: this.redo.domNode, title: 'Redo (ctrl + y)'})
                ];
            },

            startup: function(){

                this.inherited(arguments);

                array.forEach(this.tooltips, function(tooltip){tooltip.startup()});

                document.execCommand('styleWithCSS', 0, true);

                this.events = [
                    on(this.target, 'mouseup, keyup', lang.hitch(this, function(){
                        this.saveSelection();
                        this.updateToolbar();
                    })),
                    this.font.on('item-click', lang.hitch(this, function(item){
                        this.font.hide();
                        this.execCommand('fontName', item.id);
                    })),
                    this.fontSize.on('item-click', lang.hitch(this, function(item){
                        this.fontSize.hide();
                        this.execCommand('fontSize', item.size);
                    })),
                    on(this.createLink, 'click', lang.hitch(this, function(){
                        this.createLinkDropdown.hide();
                        this.execCommand('createLink', this.createLinkTextBox.get('value'));
                    }))
                ];

                array.forEach(this._buttonCommands, lang.hitch(this, function(command){
                    this[command].set('keyTarget', this.target);
                    this.events.push(
                        this[command].on('click', lang.hitch(this, function(){
                            this.execCommand(command);
                        }))
                    )
                })),

                array.forEach(this._toggleCommands, lang.hitch(this, function(command){
                    this[command].set('keyTarget', this.target);
                    this.events.push(
                        this[command].on('click', lang.hitch(this, function(){
                            this.execCommand(command, this[command].get('active'));
                        }))
                    )
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

            execCommand: function(command, args){
                this.restoreSelection();
                document.execCommand(command, 0, args);
                focus.focus(this.target);
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
