define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/string',
    '../../widget/Modal',
    'dojo/text!./template/ExceptionModalFooter.html',
    'dojo/text!./template/ExceptionModalBody.html'
],
function (
    declare,
    domConstruct,
    string,
    Modal,
    footerTemplate,
    bodyTemplate
){

    return declare(
        [],
        {
            minSeverity: 0,

            //modal: undefined,

            render: function(exceptionModel){
                if (!this.modal){
                    this.modal = new Modal({footerTemplate: footerTemplate});
                    domConstruct.place(this.modal.domNode, document.body);
                    this.modal.startup();
                }

                this.modal.set('title', exceptionModel.severity);

                domConstruct.place(string.substitute(bodyTemplate, exceptionModel), this.modal.containerNode, 'only');
                this.modal.show();
            }
        }
    );
});
