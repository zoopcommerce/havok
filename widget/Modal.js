define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/Deferred',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/registry',
    './_WidgetBase',
    './_WidgetsInTemplateMixin',
    '../form/_FormMixin',
    './_HideableMixin',
    'dojo/text!./template/Modal.html',
    'dojo/text!./template/CloseButton.html',
    '../less!./less/modals.less',
    './Button',
    './_HotkeyMixin'
],
function (
    declare,
    lang,
    array,
    on,
    Deferred,
    domClass,
    domConstruct,
    registry,
    WidgetBase,
    WidgetsInTemplateMixin,
    FormMixin,
    HideableMixin,
    template,
    closeButtonTemplate
){
    // module:
    //		havok/widget/Modal

    return declare(
        [WidgetBase, WidgetsInTemplateMixin, FormMixin, HideableMixin],
        {
            // summary:
            //
            // description:
            //		Creates a modal. Use the show() and hide() methods to
            //      iniitate and cancel.

            // templateString: string
            templateString: template,

            closeButtonTemplate: closeButtonTemplate,

            // button: string
            //     The button node that was clicked to close the modal.
            button: undefined,

            buildRendering: function(){

                var header, footer;

                if (this.srcNodeRef){
                    header = this.srcNodeRef.querySelector('header');
                    footer = this.srcNodeRef.querySelector('footer');
                }

                this.inherited(arguments);

                if (header) while(header.childNodes.length>0) this.header.appendChild(header.childNodes[0]);

                if (footer){
                    array.forEach(registry.findWidgets(this.footer), function(widget){widget.destroy()});
                    this.footer.innerHTML = '';
                    while(footer.childNodes.length>0) this.footer.appendChild(footer.childNodes[0]);
                }
            },

            startup: function(){

                this.inherited(arguments);

                var i,
                    buttons;

                buttons = this.footer.querySelectorAll('[type=submit]');
                for(i=0; i<buttons.length; i++) on(buttons[i], 'click', lang.hitch(this, this.onOkClick))

                buttons = this.footer.querySelectorAll('[type=reset]')
                for(i=0; i<buttons.length; i++) on(buttons[i], 'click', lang.hitch(this, this.onOkClick))

                buttons = registry.findWidgets(this.footer);
                for(i=0; i<buttons.length; i++){
                    if (buttons[i].type == 'submit') on(buttons[i], 'click', lang.hitch(this, this.onOkClick));
                    if (buttons[i].type == 'reset') on(buttons[i], 'click', lang.hitch(this, this.onCancelClick));
                }
            },

            onOkClick: function(e){
                if (this.get('state') == ''){
                    this.set('button', e.target);
                    this.hide();
                } else {
                    this.set('postActivity', true);
                }
            },

            onCloseClick: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.set('button', e.target);
                this.hide();
            },

            onBackdropClick: function(e){
                // summary:
                //    Event called by the template when the backdrop is clicked.
                if (e.target == this.backdrop){
                    e.preventDefault();
                    e.stopPropagation();
                    this.set('button', 'backdrop');
                    this.hide();
                }
            },

            show: function(/*Object*/value)
            {
                // summary:
                //    Display the modal
                //
                // value: Optional. A value object that can be used to set the form.
                //
                // returns: A deferred that will resolve to the modal value when the
                //          modal is hidden

                domConstruct.place(this.modal, document.body);

                this.set('value', value);

                if (!this.hidden){
                    return this._returnValueDeferred;
                }

                this.inherited(arguments); //makes the dialog visible

                this._returnValueDeferred = new Deferred();
                return this._returnValueDeferred;
            },

            hide: function()
            {
                // summary:
                //    Hide the modal. Calling this will resolve the deferred returned by show()

                this.inherited(arguments); //makes the modal hidden

                var value = this.get('value');
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(value)
                }
                return value;
            },

            _show: function(){

                //turn on button keypress handling
                var children = registry.findWidgets(this.footer),
                    i;
                for (i = 0; i < children.length; i++){
                    if (children[i].keyTarget != undefined){
                        children[i].set('keyTarget', window);
                    }
                }

                this.set('button', undefined);

                this.connectChildren();

                domClass.add(document.body, 'no-scroll');
                domClass.remove(this.modal, 'hide');
            },

            _hide: function(){

                //turn off button keypress handling
                var children = registry.findWidgets(this.footer),
                    i;
                for (i = 0; i < children.length; i++){
                    if (children[i].keyTarget != undefined){
                        children[i].set('keyTarget', false);
                    }
                }

                domClass.remove(document.body, 'no-scroll');
                domClass.add(this.modal, 'hide');
            }
        }
    );
});
