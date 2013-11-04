        <section id="exception-handler" title="Exception Handler">
          <div class="page-header">
            <h1>Exception Handler</h1>
          </div>

          <p class="lead">Throw, handle, view, and log js exceptions.</p>

          <p>The exception handler will catch and process all js exceptions. It allows you to define exception severity and render exceptions to the console, a server, or to the user interface.</p>

          <h2>Using</h2>

          <p>To turn on the exception handler use the <code>havok/exception/started!</code>. It is suggested that this be done just after havok has first loaded. Eg:</p>

<pre class="prettyprint linenums">
require(['havok/exception/started!'], function(){
    //do something
})
</pre>

          <h2>How it works</h2>

          <p>The exception handler listens to <code>window.onerror</code>. Any exceptions that are not handled by application code are caught and handled by the exception handler. Eg:</p>
          <div class="bs-docs-example">
                <button class="btn" onclick="console.debug(obj());">Not Defined</button>
          </div>
<pre class="prettyprint linenums">
&lt;button class=&quot;btn&quot; onclick=&quot;console.debug(obj());&quot;&gt;Not Defined&lt;/button&gt;
</pre>
          <p>Note: Open your console to see the exception rendered there.</p>

          <h2>Severity</h2>

          <p>Each exception has a severity. The possible severity codes are:</p>

<pre class="prettyprint linenums">
NOTICE   : 1,
WARNING  : 2,
ERROR    : 3
</pre>
          <p>The higher the number, the more serious the exception.</p>

          <p>By default, all exceptions have a severity of <code>ERROR: 3</code>.</p>

          <h2>Application Exception</h2>

          <p>The severity of an error can be cusomised by throwing an instance of <code>havok/exception/Application</code>.</p>
          <div class="bs-docs-example">
              <script>
                  require(['dojo/on', 'dojo/dom', 'havok/exception/severity', 'havok/exception/Application', 'dojo/domReady!'],
                       function(on, dom, severity, Application){
                            on(dom.byId('exception2'), 'click', function(){
                                throw new Application('Example Exception', {severity: severity.WARNING});
                            })
                       }
                   )
              </script>
              <button class="btn" id="exception2">Throw warning</button>
          </div>
<pre class="prettyprint linenums">
&lt;script&gt;
    require(['dojo/on', 'dojo/dom', 'havok/exception/severity', 'havok/exception/Application'],
         function(on, dom, severity, Application){
              on(dom.byId('exception2'), 'click', function(){
                  throw new Application('Example Exception', {severity: severity.WARNING});
              })
         }
     )
&lt;/script&gt;
&lt;button class=&quot;btn&quot; id=&quot;exception2&quot;&gt;Throw warning&lt;/button&gt;
</pre>

          <h2>Custom Exceptions</h2>

          <p>To create your own custom exceptions, extend <code>havok/exception/Base</code>. Eg:</p>

<pre class="prettyprint linenums">
define([
    'dojo/_base/lang',
    'dojo/errors/create',
    '../../exception/Base'
],
function(
    lang,
    create,
    BaseException
){
    return create(
        "MyCustomException",
        function(message, options){
            lang.mixin(this, options);
        },
        BaseException
    )
});
</pre>

          <h2>Renderers</h2>

          <p>The handler is configured through the di container with an array of renderers. Each renderer must have a <code>minSeverity</code> property and a <code>render</code> function. The handler checks the <code>minSeverity</code> property, and if the exception is more severe, the <code>render</code> function is called.</p>

          <h3>Console</h3>

          <p>Renders and exception the the console, including extra info like stack trace.</p>

          <p>By default the console renderer is registered with the handler and set to render all exceptions.</p>

          <h3>UI</h3>

          <p>Renders an exception as a modal for the the user to aknowledge. Eg:</p>
          <div class="bs-docs-example">
              <script>
                  require([
                      'dojo/on',
                      'dojo/dom',
                      'havok/exception/severity',
                      'havok/exception/Application',
                      'havok/exception/renderer/UI',
                      'havok/exception/started!',
                      'dojo/domReady!'
                  ],
                       function(on, dom, severity, Application, UI, handler){
                            var added = false;
                            on(dom.byId('exception3'), 'click', function(){
                                if (!added){
                                    added = true;
                                    handler.renderers.push(new UI);
                                }
                                throw new Application('Example Exception', {severity: severity.ERROR});
                            })
                       }
                   )
              </script>
              <button class="btn" id="exception3">UI Render</button>
          </div>

          <h3>Store</h3>

          <p>Renders an exception to the configured store.</p>

          <p>Click 'store render' to create an exception that is rendered to a store. Then click 'show store contents' to see the contents of the store.</p>
          <div class="bs-docs-example">
              <script>
                  require([
                      'dojo/on',
                      'dojo/dom',
                      'dojo/json',
                      'dojo/when',
                      'havok/exception/severity',
                      'havok/exception/Application',
                      'havok/exception/renderer/Store',
                      'havok/exception/started!',
                      'dojo/domReady!'
                  ],
                       function(on, dom, json, when, severity, Application, Store, handler){
                            var added = false,
                                renderer = new Store;
                            renderer.store = {data: []};

                            on(dom.byId('exception4'), 'click', function(){
                                if (!added){
                                    added = true;
                                    handler.renderers.push(renderer);
                                }
                                throw new Application('Example Exception', {severity: severity.ERROR});
                            });
                            on(dom.byId('store4'), 'click', function(){
                                when(renderer.getStore(), function(store){
                                    dom.byId('storeContents').innerHTML = json.stringify(store.data, null, '    ');
                                })
                            })
                       }
                   )
              </script>
              <button class="btn" id="exception4">Store Render</button>
              <div class="well">
                  <button class="btn" id="store4">Show store contents</button>
                  <p>Store items:</p>
                  <pre id="storeContents"></pre>
              </div>
          </div>

          <p>Tip: use a json rest store to send exceptions back to a server for logging.</p>

        </section>
