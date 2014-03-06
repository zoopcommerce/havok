define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './severity',
    './Application',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    severity,
    Application,
    Stateful
){
    return declare(
        [Stateful],
        {

            // summary:
            //     Module providing exception display and logging

            //renderers: undefined,

            //started: false,

            _exceptionSetter: function(value){
                this.handle(value);
            },

            startup: function(){
                if ( ! this.started){
                    window.onerror = lang.hitch(this, function(message, file, line){
                        if (message.indexOf('isBase!') == -1){
                            new Application(message, {file: file, line: line});
                        }
                        return true;
                    });
                    this.started = true;
                }
            },

            handle: function(exception){

                var handled = false,
                    stack = exception.stack.split(/\r\n|\r|\n/g),
                    cleanStack = [],
                    stackItem,
                    i,
                    exSeverity = exception.severity;

                if (exception.file && exception.line){
                    cleanStack.push({file: exception.file, line: exception.line});
                } else {
                    for(i = 0; i < stack.length; i++){
                        if (stack[i].indexOf('ErrorCtor') != 0 && stack[i].length != 0){
                            stackItem = stack[i].split('@')[1].split(':');
                            cleanStack.push({
                                file: stackItem[0] + stackItem[1],
                                line: stackItem[2]
                            });
                        }
                    }
                }

                exception = {
                    name: exception.name,
                    message: exception.message.substring(7),
                    stack: cleanStack,
                    severity: severity.codeToString(exSeverity)
                }

                for (i = 0; i < this.renderers.length; i++){
                    var renderer = this.renderers[i];
                    if (renderer.minSeverity <= exSeverity){
                        renderer.render(exception);
                        handled = true;
                    }
                }

                delete(this.exception);
                return handled;
            }
        }
    )
});