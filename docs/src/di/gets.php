
        <section id="gets" title="gets">
          <div class="page-header">
            <h1>gets</h1>
          </div>

<p class="lead">Objects to be injected</p>

<h2>Simple get</h2>
<p>Any property set in the <code>gets</code> object will be fetched through the di and then set on the returned object.</p>

<p>For example, with this config <code>di.get('my/zoo')</code> will return an instance of <code>my/zoo</code> populated with one lion and two tigers. The two tigers will have different names.</p>
<pre class="prettyprint linenums">
'my/zoo': {
    gets: {
       lion: 'my/lion/module',
       tiger1: 'tiger1',
       tiger2: 'tiger2
    }
},
'tiget1': {
    base: 'my/tiger/module',
    params: {
        name: 'Toby'
    }
},
'tiget1': {
    base: 'my/tiger/module',
    params: {
        name: 'Alice'
    }
}
</pre>

<h2>Inline config</h2>

<p>Rather than specifying a string in a get, you can use an inline config to make the code more consise and easier to read. The example above could be rewritten as:</p>

<pre class="prettyprint linenums">
'my/zoo': {
    gets: {
       lion: 'my/lion/module',
       tiger1: {
            base: 'my/tiger/module',
            params: {
                name: 'Toby'
       },
       tiger2: {
            base: 'my/tiger/module',
            params: {
                name: 'Alice'
       }
    }
}
</pre>

        </section>
