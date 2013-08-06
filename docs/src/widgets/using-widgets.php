<section id="using-widgets" title="Using Widgets">
  <div class="page-header">
    <h1>Using Widgets</h1>
  </div>


    <h3>Individual or complied</h3>
    <p>As with all havok modules, widgets are all comply with the AMD specification. They may be loaded individually, built into your own compiled layer with the dojo build tool (or another build tool), or used from the compiled havok.js distributable.</p>

    <h3>Declataive use</h3>
    <p>All widgets can be defined declatively as valid HTML and then instantated with the dojo parser.</p>

    <p>To define declartively, use the `data-dojo-type` attribute, and parse the html when the dom is ready:</p>
<pre class="prettyprint linenums">
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dojo/parser', 'havok/widget/Alert','dojo/domReady!'], function(parser){parser.parse()})
&lt;/script&gt;
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
    &lt;strong&gt;Warning!&lt;/strong&gt; Best check yo self, you're not looking too good.
&lt;/div&gt;
</pre>

    <h3>Programatic use</h3>
    <p>To define programatically, first create an instance, then add to the dom, and call `startup`:</p>

<pre class="prettyprint linenums">
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['havok/widget/Alert', 'dojo/domReady!'], function(Alert){
        var alert = new Alert({
            innerHTML: &quot;&lt;strong&gt;Warning!&lt;/strong&gt; Best check yo self, you're not looking too good.&quot;,
            hidden: false
        });
        dom.byId('alert').appendChild(alert.domNode);
        alert.startup();
    })
&lt;/script&gt;
&lt;div id=&quot;alert&quot;&gt;&lt;/alert&gt;
</pre>

     <h3>Leveraging the power of dojo</h3>
     <p>Widgets are built on dojo's dijit framework, and so use the standard dijit lifecycle, templating, etc.</p>

</section>
