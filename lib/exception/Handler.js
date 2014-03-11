define([
    'dojo/_base/lang',
    './severity',
    './Application',
    './renderer/Console'
],
function(
    lang,
    severity,
    Application,
    Console
){
	// module:
	//		havok/exception/handler

    /*=====
    var __Renderer = {
        // minSeverity: Int
        // render: Function
    };
    =====*/

    var handler = {
        // summary:
        //     Module providing exception display and logging

        /*=====
        // renderers: __Renderer[]
        //      Holds and array of exception renderers.
        renderers: undefined,
        =====*/

        /*=====
        // started: Boolean
        //      Has the exception handler been started?
        started: undefined,
        =====*/

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

            return handled;
        }
    }

    handler.renderers = [new Console];
    return handler;
});