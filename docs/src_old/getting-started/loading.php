<section id="loading" title="Loading">
  <div class="page-header">
    <h1>Loading</h1>
  </div>
  <p class="lead">Load Havok in your pages.</p>

    <h2>Quick and Dirty</h2>
	<p>If you are using the Havok dist you need to link <code>havok.css</code>, and load <code>havok.js</code>:</p>
<pre class="prettyprint linenums">
&lt;link rel=&quot;stylesheet&quot; href=&quot;path/to/havok.css&quot;&gt;
&lt;script src=&quot;path/to/havok.js&quot;&gt;&lt;/script&gt;
</pre>
	
	<h2>Development configuration</h2>
    <p>In development mode all js modules are loaded async. In addition, less files are also loaded async and compliled client side. This makes development mode very flexible, responsive to code changes, and simple to debug. However, it does mean page loads are slow, so don't use this for production code.</p>
	
	<p>To load in development mode you'll first need to specify a simple dojoConfig, and then load <code>dojo/dojo</code>:</p>
<pre class="prettyprint linenums">	
&lt;script type=&quot;text/javascript&quot;&gt;
	dojoConfig = {
		isDebug: true,
		async: true,
		merge: [
			'havok/config'
		]
	}
&lt;/script&gt;
&lt;script src=&quot;path/to/dojo/dojo.js&quot;&gt;&lt;/script&gt;
</pre>
	
	<h2>Production configuration</h2>
	<p>It is strongly recommended that you use the havok build tools to create a bootable layer that is used in production. Load your built layer css and js, and you're ready to go:</p>
<pre class="prettyprint linenums">
&lt;link rel=&quot;stylesheet&quot; href=&quot;path/to/layer.css&quot;&gt;
&lt;script src=&quot;path/to/bootable/layer.js&quot;&gt;&lt;/script&gt;
</pre>
	
</section>
