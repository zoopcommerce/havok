
        <section id="base" title="base">
          <div class="page-header">
            <h1>base</h1>
          </div>

<p class="lead">Tell di which object injections should be applied to.</p>

<p>The base defines which object the di will inject. For example, with this config <code>di.get('myIdentifier')</code> will get an instance of <code>my/module</code> with the <code>color</code> property set to blue.</p>

<pre class="prettyprint linenums">
'myIdentifier': {
    base: 'my/module',
    params: {
        color: 'blue'
    }
},
</pre>

<h3>Ommited Base</h3>
<p>If the base is ommitted, the identifier is assumed to be the base. Eg:</p>

<pre class="prettyprint linenums">
'my/module': {
    params: {
        color: 'blue'
    }
},
</pre>

<h3>Chaining</h3>
<p>If base is set to a string, the base will be fetched through the di. This allows chaining. </p>

<p>For example, with this config <code>di.get('myIdentifier')</code> will get an instance of <code>my/module</code> with the <code>color</code> property set to blue and <code>size</code> property set to big.</p>
<pre class="prettyprint linenums">
'my/module': {
    params: {
        color: 'blue'
    }
},
'myIdentifier: {
    base: 'my/module',
    params: {
        size: 'big'
    }
}
</pre>

<h3>Identifier without config</h3>
<p>If an identifier is not configured, the di will assume it is a module, and just load that module using <code>require</code>.</p>

<h3>Object base</h3>

<p>If the base is an object, rather than a string, that object will be used for injection.</p>

<p>For example, with this config <code>di.get('myIdentifier')</code> will return <code>{size: 'big'}</code>.</p>
<pre class="prettyprint linenums">
'myIdentifier: {
    base: {},
    params: {
        size: 'big'
    }
}
</pre>

        </section>
