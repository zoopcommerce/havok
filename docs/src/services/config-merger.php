
        <section id="config-merger" title="Config Merger">
          <div class="page-header">
            <h1>Config Merger</h1>
          </div>

          <p class="lead">Create a merged dojo config from many different modules.</p>

          <p>When you require <code>dojo/_base/config</code> you get back the dojo configuration object. Modules requiring configuration often use their own extensions to this object. Some havok modules, notably <code>havok/di</code> and <code>havok/less</code> use this pattern.</p>

          <p>The <code>havok/config</code> modules allow you to build up the config object from multiple sources, and allows one config to be overridden by another - particularly useful for development or testing environments.</p>

          <p>Use the <code>merge</code> key to specify the config modules to be merged. Eg:</p>

<pre class="prettyprint linenums">
dojoConfig = {
    isDebug: true,
    popup: true,
    async: true,
    merge: [
        'MyNamespace/Config1',
        'MyNamespace/Config2'
    ]
}
</pre>

          <h2>Merging</h2>

          <p>The config modules can be loaded and merged using the <code>merge</code> function of <code>havok/config/manager</code>.

           <p>The merge() function will return a Deferred object which will resolve when the config merge is complete.</p>

<pre class="prettyprint linenums">
require(['havok/config/manager'], function(configManager){
    configManager.merge().then(function(){
        //config merge complete
    })
}
</pre>


           <h2>ready!</h2>

<p>Alternatively, config modules can be merged using the <code>havok/config/ready!</code> AMD plugin. The plugin will not return until configs are merged.</p>

<pre class="prettyprint linenums">
require(['havok/config/ready!'], function(){
    //Do something
}
</pre>

<h2>Dojo builds</h2>

<p>If you use the havok build tool, it will merge all configs during the build, so that config merging does not happen in production.</p>

        </section>
