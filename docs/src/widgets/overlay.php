
        <section id="overlay" title="Overlay">
          <div class="page-header">
            <h1>Overlay</h1>
          </div>

            <p><code>havok/widget/Overlay</code> A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a particular DOM node is processing and cannot be clicked on at this time.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
            <span id="overlay1" data-dojo-type="havok/widget/Overlay">This is overlayed</span>
            <button id="overlayToggle1" data-dojo-type="havok/widget/ToggleButton">Toggle overlay</button>
            <script>
                require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                    registry.byId('overlayToggle1').watch('active', function(){
                        registry.byId('overlay1').toggle();
                    });
                })
            </script>
          </div>

<pre class="prettyprint linenums">
&lt;p&gt;...&lt;/p&gt;
&lt;span id=&quot;overlay1&quot; data-dojo-type=&quot;havok/widget/Overlay&quot; &gt;This is overlayed&lt;/span&gt;
&lt;button id=&quot;overlayToggle1&quot; data-dojo-type=&quot;havok/widget/ToggleButton&quot;&gt;Toggle overlay&lt;/button&gt;
&lt;script&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        registry.byId('overlayToggle1').watch('active', function(){
            registry.byId('overlay1').toggle();
        });
    })
&lt;/script&gt;
</pre>

          <h2>With wait cursor</h2>
          <div class="bs-docs-example">
            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
            <span id="overlay2" class="overlay-wait" data-dojo-type="havok/widget/Overlay">This is overlayed</span>
            <button id="overlayToggle2" data-dojo-type="havok/widget/ToggleButton">Toggle overlay</button>
            <script>
                require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                    registry.byId('overlayToggle2').watch('active', function(){
                        registry.byId('overlay2').toggle();
                    });
                })
            </script>
          </div>

<pre class="prettyprint linenums">
&lt;p&gt;...&lt;/p&gt;
&lt;span id=&quot;overlay2&quot; class=&quot;overlay-wait&quot; data-dojo-type=&quot;havok/widget/Overlay&quot; &gt;This is overlayed&lt;/span&gt;
&lt;button id=&quot;overlayToggle2&quot; data-dojo-type=&quot;havok/widget/ToggleButton&quot;&gt;Toggle overlay&lt;/button&gt;
&lt;script&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        registry.byId('overlayToggle2').watch('active', function(){
            registry.byId('overlay2').toggle();
        });
    })
&lt;/script&gt;
</pre>

          <h2>Overlay whole viewport</h2>
          <p>By default, the overlay widget will target the previous element in the dom. This can be changed by specifying an alternate target node. Eg:</p>

          <div class="bs-docs-example">
            <span id="overlay3"
                  data-dojo-type="havok/widget/Overlay"
                  data-dojo-props="target: document.body"
            >
                <button id="overlay3hide" class="btn">Hide overlay</button>
            </span>
            <button id="overlay3show" class="btn">Show overlay</button>
            <script>
                require(['dijit/registry', 'dojo/dom', 'dojo/on', 'havok/parseComplete!'], function(registry, dom, on){
                    on(dom.byId('overlay3show'), 'click', function(){
                        registry.byId('overlay3').show();
                    });
                    on(dom.byId('overlay3hide'), 'click', function(){
                        registry.byId('overlay3').hide();
                    });
                })
            </script>
          </div>

<pre class="prettyprint linenums">
&lt;span id=&quot;overlay3&quot;
      data-dojo-type=&quot;havok/widget/Overlay&quot;
      data-dojo-props=&quot;target: document.body&quot;
&gt;
    &lt;button id=&quot;overlay3hide&quot; class=&quot;btn&quot;&gt;Hide overlay&lt;/button&gt;
&lt;/span&gt;
&lt;button id=&quot;overlay3show&quot; class=&quot;btn&quot;&gt;Show overlay&lt;/button&gt;
&lt;script&gt;
    require(['dijit/registry', 'dojo/dom', 'dojo/on', 'havok/parseComplete!'], function(registry, dom, on){
        on(dom.byId('overlay3show'), 'click', function(){
            registry.byId('overlay3').show();
        });
        on(dom.byId('overlay3hide'), 'click', function(){
            registry.byId('overlay3').hide();
        });
    })
&lt;/script&gt;
</pre>

        </section>
