
        <section id="less" title="Less">
          <div class="page-header">
            <h1>Less</h1>
          </div>

          <p class="lead">Bundle less with widgets for better OOP design</p>

          <p>Use the <code>havok/less!</code>. AMD plugin to define and load the less files you need.</p>

<pre class="prettyprint linenums">
define([
    'havok/less!my/less/file.less'
],
function (){
    //my module code
});
</pre>

          <h2>Config</h2>

          <p>The less plugin takes an array of less files. The files are loaded and parsed client side, and the resulting css is inserted into the page. A priority can be used to control the order they are parsed.</p>

          <p>Less files can be added to the plugin in two ways. Firstly through <code>dojoConfig</code>. Eg:</p>

<pre class="prettyprint linenums">
dojoConfig = {
    ...
    less: [
        {priority: 500, src: "my/less/file.less"},
        {priority: 500, src: "another/less/file.less"}
    ]
}
</pre>
          <p>Secondly, less files can be added through the plugin, as in the example above. If no priority is passed to the plugin, it defaults to 500. To pass priority, use a json object:</p>
<pre class="prettyprint linenums">
define([
    'havok/less!{"priority": 1, "src": "my/less/file.less"}'
],
function (){
    //my module code
});
</pre>

          <h2>Use</h2>

          <p>Dynamically requiring less and compiling it client side is great for development - no intermediate steps, just edit your code and reload the browser. However, it is slow and inefficent for production. It is strongly recommended that you use the havok build tools to compile all less to css before deployment.</p>

        </section>
