define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/query',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dijit/registry',
    './_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    '../form/_FormMixin',
    './_HideableMixin',
    'dojo/text!./template/Modal.html',
    'dojo/text!./template/ModalFooter.html',
    'dojo/text!./template/CloseButton.html',
    '../less!./less/modals.less',
    './Button'
],
function (
    declare,
    Deferred,
    query,
    domClass,
    domConstruct,
    registry,
    WidgetBase,
    WidgetsInTemplateMixin,
    FormMixin,
    HideableMixin,
    template,
    footerTemplate,
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

            footerTemplate: footerTemplate,

            // button: string
            //     The button node that was clicked to close the modal.
            button: undefined,

            closeButtonTemplate: closeButtonTemplate,

            buildRendering: function(){

                var footerNode,
                    list;

                if (this.srcNodeRef){
                    list = query('[data-dojo-attach-point="footer"]', this.srcNodeRef);
                    if (list.length > 0){
                        footerNode = list[0];
                        this.footerTemplate = footerNode.innerHTML;
                        domConstruct.destroy(footerNode);
                    }
                }

                this.inherited(arguments);
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

            _setTitleAttr: { node: "titleNode", type: "innerHTML" },

            _setContentAttr: function(content){
                if (content.domNode){
                    domConstruct.empty(this.containerNode);
                    this.containerNode.appendChild(content.domNode);
                } else {
                    this.containerNode.innerHTML = content;
                }
            },

            show: function(/*object*/value)
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
