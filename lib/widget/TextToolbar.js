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
    'dijit/registry',
    './ButtonGroup',
    './DropdownToggle',
    './Dropdown',
    './DropdownContainer',
    './DropdownSubmenu',
    './Button',
    './ToggleButton',
    './_StoreMixin',
    './_HotkeyMixin',
    '../form/TextBox',
    './_WidgetBase',
    '../less!./less/text-toolbar.less'
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
    registry,
    ButtonGroup,
    DropdownToggle,
    Dropdown,
    DropdownContainer,
    DropdownSubmenu,
    Button,
    ToggleButton,
    StoreMixin,
    HotkeyMixin,
    TextBox,
    WidgetBase
){
    // module:
    //    	havok/widget/TextToolbar

    return declare(
        [WidgetBase],
        {
            // summary:
            //      Widget to display a text editor toolbar

            /*=====
            // _tooltips: Tooltip[]
            //      Array of tooltip widgets
            _tooltips: undefined,
            =====*/

            /*=====
            // target: DomNode
            //      The dom node with text that is edited by this toolbar
            target: undefined,
            =====*/

            tag: 'span',

            baseClass: 'text-editor-toolbar',

            _tools: [
                {
                    cmd: 'font',
                    icon: 'font',
                    type: 'dropdown',
                    store: 'font',
                    tooltip: 'Font'
                },
                {
                    cmd: 'fontSize',
                    icon: 'text-height',
                    type: 'dropdown',
                    store: 'fontsize',
                    tooltip: 'Font Size'
                },
                {
                    cmd: 'style',
                    type: 'group',
                    tooltip: 'Style',
                    icon: 'bold',
                    buttons: [
                        {
                            cmd: 'bold',
                            icon: 'bold',
                            type: 'toggle',
                            hotkey: 'ctrl b',
                            tooltip: 'Bold'
                        },
                        {
                            cmd: 'italic',
                            icon: 'italic',
                            type: 'toggle',
                            hotkey: 'ctrl i',
                            tooltip: 'Italic'
                        },
                        {
                            cmd: 'strikethrough',
                            icon: 'strikethrough',
                            type: 'toggle',
                            tooltip: 'Strikethrough'
                        },
                        {
                            cmd: 'underline',
                            icon: 'underline',
                            type: 'toggle',
                            hotkey: 'ctrl u',
                            tooltip: 'Underline'
                        }
                    ]
                },
                {
                    cmd: 'align',
                    type: 'group',
                    tooltip: 'Align',
                    icon: 'align-left',
                    buttons: [
                        {
                            cmd: 'justifyleft',
                            icon: 'align-left',
                            type: 'toggle',
                            hotkey: 'ctrl l',
                            tooltip: 'Align Left'
                        },
                        {
                            cmd: 'justifycenter',
                            icon: 'align-center',
                            type: 'toggle',
                            hotkey: 'ctrl e',
                            tooltip: 'Align Center'
                        },
                        {
                            cmd: 'justifyright',
                            icon: 'align-right',
                            type: 'toggle',
                            hotkey: 'ctrl r',
                            tooltip: 'Align Right'
                        },
                        {
                            cmd: 'justifyfull',
                            icon: 'align-justify',
                            type: 'toggle',
                            hotkey: 'ctrl j',
                            tooltip: 'Justify'
                        }
                    ]
                },
                {
                    cmd: 'tab',
                    type: 'group',
                    tooltip: 'Indent',
                    icon: 'indent',
                    buttons: [
                        {
                            cmd: 'outdent',
                            icon: 'outdent',
                            type: 'button',
                            hotkey: 'shift TAB',
                            tooltip: 'Reduce indent'
                        },
                        {
                            cmd: 'indent',
                            icon: 'indent',
                            type: 'button',
                            hotkey: 'TAB',
                            tooltip: 'Indent'
                        }
                    ]
                },
                {
                    cmd: 'list',
                    type: 'group',
                    tooltip: 'List',
                    icon: 'list-ul',
                    buttons: [
                        {
                            cmd: 'insertUnorderedList',
                            icon: 'list-ul',
                            type: 'button',
                            tooltip: 'Bullet list'
                        },
                        {
                            cmd: 'insertOrderedList',
                            icon: 'list-ol',
                            type: 'button',
                            tooltip: 'Number list'
                        }
                    ]
                },
                {
                    cmd: 'links',
                    type: 'group',
                    tooltip: 'Link',
                    icon: 'link',
                    buttons: [
                        {
                            cmd: 'link',
                            icon: 'link',
                            type: 'linkDropdown',
                            tooltip: 'Hyperlink'
                        },
                        {
                            cmd: 'unlink',
                            icon: 'unlink',
                            type: 'button',
                            tooltip: 'Remove Hyperlink'
                        }
                    ]
                },
                {
                    cmd: 'correct',
                    type: 'group',
                    tooltip: 'Correct',
                    icon: 'undo',
                    buttons: [
                        {
                            cmd: 'undo',
                            icon: 'undo',
                            type: 'button',
                            hotkey: 'ctrl z',
                            tooltip: 'Undo'
                        },
                        {
                            cmd: 'redo',
                            icon: 'repeat',
                            type: 'button',
                            hotkey: 'ctrl y',
                            tooltip: 'Redo'
                        }
                    ]
                },
                {
                    cmd: 'views',
                    type: 'group',
                    tooltip: 'View',
                    icon: 'code',
                    buttons: [
                        {
                            cmd: 'source',
                            icon: 'code',
                            type: 'toggle',
                            tooltip: 'Edit source'
                        }
                    ]
                },
                {
                    cmd: 'more',
                    type: 'moreDropdown',
                    icon: 'chevron-down',
                    tooltip: 'More'
                }
            ],

            // view: String
            //      Currently active view. Possible values are `wysiwig|source`.
            //      Defaults to `wysiwig`.
            view: 'wysiwig', // wysiwig | source

            buildRendering: function(){

                this._tooltips = [];
                this._toggleCommands = [];

                var rendered = this._rendered;

                this.inherited(arguments);

                if (!rendered) {
                    //do main rendering (can be done server side)
                    var dropdownToggle,
                        group;

                    array.forEach(this._tools, lang.hitch(this, function(tool){
                        switch (tool.type){
                            case 'dropdown':
                                dropdownToggle = new DropdownToggle({
                                    tag: 'button',
                                    'class': 'btn tool-group',
                                    innerHTML: '<span><i class="fa fa-' + tool.icon  +'"></i><span class="caret"></span></span>'
                                });
                                dropdownToggle.domNode.setAttribute('data-havok-text-cmd', tool.cmd);
                                this.containerNode.appendChild(dropdownToggle.domNode);
                                break;
                            case 'group':
                                group = new ButtonGroup({'class': 'tool-group'});

                                array.forEach(tool.buttons, lang.hitch(this, function(button){
                                    var buttonWidget;
                                    switch (button.type){
                                        case 'toggle':
                                            if (button.hotkey) buttonWidget = new (declare([ToggleButton, HotkeyMixin]))({hotkey: button.hotkey, innerHTML: '<i class="fa fa-' + button.icon + '"></i>'})
                                            else buttonWidget = new ToggleButton({innerHTML: '<i class="fa fa-' + button.icon + '"></i>'})
                                            break;
                                        case 'button':
                                            if (button.hotkey) buttonWidget = new (declare([Button, HotkeyMixin]))({hotkey: button.hotkey, innerHTML: '<i class="fa fa-' + button.icon + '"></i>'})
                                            else buttonWidget = new Button({innerHTML: '<i class="fa fa-' + button.icon + '"></i>'})
                                            break;
                                        case 'linkDropdown':
                                            buttonWidget = new DropdownToggle({
                                                tag: 'button',
                                                'class': 'btn',
                                                innerHTML: '<i class="fa fa-' + button.icon  +'"></i>'
                                            });
                                            break;
                                    }
                                    buttonWidget.domNode.setAttribute('data-havok-text-cmd', button.cmd);
                                    group.addItem(buttonWidget.domNode);
                                }))
                                this.containerNode.appendChild(group.domNode);
                                group.domNode.setAttribute('data-havok-text-cmd', tool.cmd);
                                break;
                            case 'moreDropdown':

                                dropdownToggle = new DropdownToggle({
                                    tag: 'button',
                                    'class': 'btn tool-group',
                                    innerHTML: '<i class="fa fa-' + tool.icon  +'"></i></span>'
                                });
                                dropdownToggle.domNode.setAttribute('data-havok-text-cmd', tool.cmd);
                                this.containerNode.appendChild(dropdownToggle.domNode);
                                break;
                        }
                    }))
                } else {
                    array.forEach(this._tools, lang.hitch(this, function(tool){
                        var node = this.containerNode.querySelector('[data-havok-text-cmd=' + tool.cmd + ']'),
                            widget;
                        node.removeAttribute('id');
                        node.removeAttribute('widgetId');
                        switch (tool.type){
                            case 'dropdown':
                                widget = new DropdownToggle({}, node);
                                break;
                            case 'group':
                                widget = new ButtonGroup({}, node);

                                array.forEach(tool.buttons, lang.hitch(this, function(button){
                                    var buttonNode = this.containerNode.querySelector('[data-havok-text-cmd=' + button.cmd + ']'),
                                        buttonWidget;
                                    buttonNode.removeAttribute('id');
                                    buttonNode.removeAttribute('widgetId');
                                    switch (button.type){
                                        case 'toggle':
                                            if (button.hotkey) buttonWidget = new (declare([ToggleButton, HotkeyMixin]))({}, buttonNode);
                                            else buttonWidget = new ToggleButton({}, buttonNode)
                                            break;
                                        case 'button':
                                            if (button.hotkey) buttonWidget = new (declare([Button, HotkeyMixin]))({}, buttonNode);
                                            else buttonWidget = new Button({}, buttonNode)
                                            break;
                                        case 'linkDropdown':
                                            buttonWidget = new DropdownToggle({}, buttonNode);
                                            break;
                                    }
                                    buttonWidget.domNode.setAttribute('data-havok-text-cmd', button.cmd);
                                }))
                                break;
                            case 'moreDropdown':
                                widget = new DropdownToggle({}, node);
                                break;
                        }
                        widget.domNode.setAttribute('data-havok-text-cmd', tool.cmd);
                    }))
                }
            },

            startup: function(){

                this.inherited(arguments);

                if (typeof this.target == 'string') this.target = dom.byId(this.target)
                if (!this.target) this.target = registry.getEnclosingWidget(this.domNode.parentElement).containerNode

                document.execCommand('styleWithCSS', 0, true);

                var widget,
                    dropdown,
                    button,
                    addTooltip = lang.hitch(this, function(target, title, hotkey){
                        if (hotkey) title += ' (' + hotkey + ')'
                        var tooltip = new Tooltip({target: target, title: title});
                        this._tooltips.push(tooltip);
                        tooltip.startup();
                    }),
                    createButton,
                    textbox,
                    submenu,
                    submenuDropdown;

                array.forEach(this._tools, lang.hitch(this, function(tool){
                    widget = registry.getEnclosingWidget(this.containerNode.querySelector('[data-havok-text-cmd=' + tool.cmd + ']'));
                    this[tool.cmd] = widget;
                    switch (tool.type){
                        case 'dropdown':
                            dropdown = new (declare([Dropdown, StoreMixin], null))({store: tool.store});
                            dropdown.startup();

                            widget.set('dropdown', dropdown);
                            addTooltip(widget.button, tool.tooltip);
                            break;
                        case 'group':
                            array.forEach(tool.buttons, lang.hitch(this, function(button){
                                var buttonWidget = registry.getEnclosingWidget(this.containerNode.querySelector('[data-havok-text-cmd=' + button.cmd + ']'));
                                switch (button.type){
                                    case 'toggle':
                                        this._toggleCommands.push(button.cmd);
                                        this._toggleWatcher(buttonWidget, button.cmd);
                                        break;
                                    case 'button':
                                        this._buttonWatcher(buttonWidget, button.cmd);
                                        break;
                                    case 'linkDropdown':
                                        this.createLink = createButton = document.createElement('button');
                                        createButton.innerHTML = 'Add';
                                        this.createLinkTextBox = textbox = new TextBox({append: createButton});
                                        dropdown = new DropdownContainer();
                                        dropdown.containerNode.appendChild(textbox.domNode);
                                        buttonWidget.set('dropdown', dropdown);
                                        textbox.startup();
                                        dropdown.startup();
                                        break;
                                }
                                buttonWidget.command = button.cmd;
                                addTooltip(buttonWidget.domNode, button.tooltip, button.hotkey);
                                this[button.cmd] = buttonWidget;
                            }))
                            break;
                        case 'moreDropdown':
                            dropdown = new Dropdown;

                            array.forEach(this._tools, lang.hitch(this, function(moreTool){
                                if (moreTool.cmd == 'more') return;

                                switch (moreTool.type){
                                    case 'dropdown':
                                        submenuDropdown = this[moreTool.cmd].dropdown;
                                        break;
                                    case 'group':
                                        submenuDropdown = new Dropdown;
                                        array.forEach(moreTool.buttons, lang.hitch(this, function(moreButton){
                                            var text = moreButton.tooltip;
                                            if (moreButton.hotkey) text += ' <span class="muted">(' + moreButton.hotkey + ')</span>';
                                            text = '<i class="fa fa-' + moreButton.icon + '"></i> ' + text;
                                            if (moreButton.type == 'linkDropdown'){
                                                var linkDropdown = new DropdownSubmenu({
                                                    dropdown: this.link.dropdown,
                                                    innerHTML: '<a>' + text + '</a>'
                                                });
                                                linkDropdown.startup();
                                                submenuDropdown.addItem(linkDropdown.domNode);
                                            } else {
                                                submenuDropdown.addItem('<a data-havok-text-cmd="' + moreButton.cmd + '">' + text + '</a>')
                                            }
                                        }))
                                        submenuDropdown.startup();
                                        this.addHandler(
                                            submenuDropdown.on('item-click', lang.hitch(this, function(e){
                                                if (e.item.firstElementChild.hasAttribute('data-havok-text-cmd')){
                                                    var command = e.item.firstElementChild.getAttribute('data-havok-text-cmd'),
                                                        args;
                                                    if (this[command].isInstanceOf(ToggleButton)) args = !this[command].get('active');
                                                    this.execCommand(command, args);
                                                }
                                            })),
                                            'text-toolbar'
                                        );
                                        break;
                                }
                                submenu = new DropdownSubmenu({
                                    dropdown: submenuDropdown,
                                    innerHTML: '<a><i class="fa fa-' + moreTool.icon  +'"></i> ' + moreTool.tooltip + '</a>'
                                });
                                dropdown.addItem(submenu.domNode);
                            }))

                            widget.set('dropdown', dropdown);
                            addTooltip(widget.button, tool.tooltip);
                            break;
                    }
                }))

                this.addHandler(on(window, 'resize', lang.hitch(this, function(){
                    this._resize();
                })), 'text-toolbar');

                this.addHandler(on(this.target, 'mouseup, keyup', lang.hitch(this, function(){
                    this.saveSelection();
                    this.updateToolbar();
                })), 'text-toolbar');

                this.addHandler(this.font.on('item-click', lang.hitch(this, function(e){
                    this.font.hide();
                    this.execCommand('fontName', e.item.getAttribute('data-havok-store-id').slice(3));
                })), 'text-toolbar');

                this.addHandler(this.fontSize.on('item-click', lang.hitch(this, function(e){
                    this.fontSize.hide();
                    //TODO: this line is a little nuts. Should simplify
                    this.fontSize.dropdown.store.get(e.item.getAttribute('data-havok-store-id').slice(3)).then(lang.hitch(this, function(data){
                        this.execCommand('fontSize', data.size);
                    }))
                })), 'text-toolbar');

                this.addHandler(on(this.createLink, 'click', lang.hitch(this, function(){
                    this.link.hide();
                    this.execCommand('createLink', this.createLinkTextBox.get('value'));
                })), 'text-toolbar');

                //add source view node
                this.sourceView = domConstruct.create(
                    'textarea',
                    {'class': 'hidden text-editor-source'},
                    this.target,
                    'after'
                );

                this._resize();
            },

            _toggleWatcher: function(toggle, cmd){
                this.addHandler(
                    toggle.on('click', lang.hitch(this, function(){
                        this.execCommand(cmd, toggle.get('active'));
                    })),
                    'text-toolbar'
                );
            },

            _buttonWatcher: function(button, cmd){
                this.addHandler(
                    button.on('click', lang.hitch(this, function(){
                        this.execCommand(cmd);
                    })),
                    'text-toolbar'
                );
            },

            destroy: function(){
                array.forEach(this._tooltips, function(tooltip){
                    tooltip.destroy();
                })
                this.inherited(arguments);
            },

            _resize: function(){

                if (this.source.get('active')) return

                var i,
                    node,
                    moreNode,
                    tooLong = lang.hitch(this, function(){
                        domClass.remove(this.more.domNode, 'hidden');
                        for (i = this._tools.length - 2; i >= 0; i--){
                            node = this[this._tools[i].cmd].domNode;
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
                        for (i = 0; i < this._tools.length - 1; i++){
                            node = this[this._tools[i].cmd].domNode;
                            if (domClass.contains(node, 'hidden')){
                                domClass.remove(node, 'hidden');
                                if (this.domNode.offsetWidth > this.domNode.parentNode.offsetWidth){
                                    tooLong();
                                    break;
                                }
                            }
                        }
                    });

                if (this.domNode.offsetWidth > this.domNode.parentNode.offsetWidth) tooLong()
                else tooShort()

                if (!domClass.contains(this.more.domNode, 'hidden')){
                    for (i = 0; i < this._tools.length - 1; i++){
                        node = this[this._tools[i].cmd].domNode;
                        moreNode = this.more.dropdown.containerNode.children[i];
                        if (domClass.contains(node, 'hidden')) domClass.remove(moreNode, 'hidden')
                        else domClass.add(moreNode, 'hidden')
                    }
                }
            },

            _setViewAttr: function(value) {
                if (value == 'source') {
                    this.sourceView.value = string.trim(this.target.innerHTML);
                    array.forEach(this._tools, lang.hitch(this, function(tool){
                        domClass.add(this[tool.cmd].domNode, 'hidden');
                    }))
                    domClass.remove(this.views.domNode, 'hidden');
                    domClass.remove(this.sourceView, 'hidden');
                    domClass.add(this.target, 'hidden');
                    this.source.set('active', true);
                    focus.focus(this.sourceView);
                } else if (this._started) {
                    this.target.innerHTML = this.sourceView.value;
                    domClass.add(this.sourceView, 'hidden');
                    domClass.remove(this.target, 'hidden');
                    this.source.set('active', false);
                    this._resize();
                    focus.focus(this.target);
                }
                this._set('view', value);
            },

            execCommand: function(command, args){

                if (command == 'source'){
                    if (args) this.set('view', 'source')
                    else this.set('view', 'wysiwig')
                    return;
                }

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
