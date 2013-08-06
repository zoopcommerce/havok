
        <section id="injecting-arrays" title="Injecting Arrays">
          <div class="page-header">
            <h1>Injecting Arrays</h1>
          </div>

<p>Arrays of values and objects can be injected, and elements from those arrays can be defined in different parts of the config.</p>

<p>This config will result in a <code>my/zoo</code> instance with an array of six different animals:</p>

<pre class="prettyprint linenums">
'my/zoo': {
    params: {
        animals: [
            'cobra',
            'crocodile'
        ]
    },
    gets: {
        animals: [
            'lion1',
            'lion2'
        ]
    },
    proxies: {
        animals: [
            'tiger',
            {
                base: 'penguin',
                name: 'Percy'
            }
        ]
    }
}
</pre>

        </section>
