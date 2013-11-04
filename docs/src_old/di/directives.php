
        <section id="directives" title="directives">
          <div class="page-header">
            <h1>directives</h1>
          </div>

<p class="lead">Fine grained control over fetching objects</p>

<p>There are four possible directives. Each is a boolean flag.</p>

<p>The default directives are:</p>
<pre class="prettyprint linenums">
directives: {
    declare: false,
    define: false,
    cache: true,
    clone: false
};
</pre>

<h2>cache</h2>

<p>The di container automatically caches objects. If you want to recreate the object every time <code>di.get()</code> is called, then set <code>cache: false</code>.

<p>For example:</p>
<pre class="prettyprint linenums">
'my/module': {
    directives: {
        cache: false
    }
}
</pre>

<h2>declare</h2>

<p>If the declare directive is set to true, then <code>dojo/_base/declare</code> will be used on the injected object, and a contstructor returned rather than an istance. This is especially useful for injecting widgets that are created by the parser. eg if this config is set:</p>

<pre class="prettyprint linenums">
'object1': {
    base: 'dijit/Form/TextBox',
    directives: {
        declare: true
    },
    params: {
        a: 1
    }
}
</pre>

<p>Then this markup could be used:</p>

<pre class="prettyprint linenums">
&lt;script type=&quot;text/javascript&quot;&gt;
    require([
        'dojo/parser',
        'get!object1',
    ],
    function(parser){
        parser.parse()
    })
&lt;/script&gt;

&lt;div data-dojo-type: 'object1'&gt;&lt;/div&gt;
</pre>

<p>This would result in a TextBox with a = 1.</p>

<h2>define</h2>

<p>If define is set to true, a new AMD module is defined with the identifier. eg, if this config is set:</p>

<pre class="prettyprint linenums">
'object1': {
    base: 'My/Module',
    directives: {
        define: true
    },
    params: {
        a: 1
    }
}
</pre>

<p>The the following code could be run:</p>

<pre class="prettyprint linenums">
require([get!object1], function(object1){})
</pre>

<p>Later in code, if object1 is required again, becasue and AMD module has been defined, the get! is no longer needed. eg:</p>

<pre class="prettyprint linenums">
require([object1], function(object1){})
</pre>

<h2>clone</h2>

<p>For objects that do not have a prototype, the base is whatever is returned by the AMD loaded. If you want to clone the base before injection, set <code>clone: true</code>.</p>

<p>For example:</p>
<pre class="prettyprint linenums">
'my/module': {
    directives: {
        clone: false
    }
}
</pre>
        </section>
