define([
    'dojo/_base/declare',
    '../../widget/Modal'
],
function (
    declare,
    Modal
){

    return declare(
        [],
        {
            minSeverity: 0,

            //modal: undefined,

            bodyTemplate: '<h4>${name}</h4><p>${message}</p>',

            footerTemplate: '<w-button class="btn-warning" type="submit" hotkey="ENTER">Ok</w-button>',

            render: function(exceptionModel){
                if (!this.modal){
                    this.modal = new Modal({footerTemplate: this.footerTemplate});
                    this.modal.startup();
                }

                this.modal.header.innerHTML = exceptionModel.severity;
                this.modal.containerNode.innerHTML = [
                    '<h4>',
                    exceptionModel.name,
                    '</h4><p>',
                    exceptionModel.message,
                    '</p>'
                ].join('');

                this.modal.show();
            }
        }
    );
});
