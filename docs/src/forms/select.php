        <section id="select" title="Select">
          <div class="page-header">
            <h1>Select</h1>
          </div>

            <p><code>havok/form/Select</code> provides nicely styled select.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select" data-dojo-props="label: 'State', helpMessages: 'please select a state'">
                    <option value="TN">Tennessee</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="FL">Florida</option>
                    <option value="CA">California</option>
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot; data-dojo-props=&quot;label: 'State'&quot;&gt;
    &lt;option value=&quot;TN&quot;&gt;Tennessee&lt;/option&gt;
    &lt;option value=&quot;VA&quot;&gt;Virginia&lt;/option&gt;
    &lt;option value=&quot;WA&quot;&gt;Washington&lt;/option&gt;
    &lt;option value=&quot;FL&quot;&gt;Florida&lt;/option&gt;
    &lt;option value=&quot;CA&quot;&gt;California&lt;/option&gt;
&lt;/select&gt;
</pre>

          <h2>Example with predefined selection</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select" data-dojo-props="label: 'State', value: 'VA'">
                    <option value="TN">Tennessee</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="FL">Florida</option>
                    <option value="CA">California</option>
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot; data-dojo-props=&quot;label: 'State', value: 'VA'&quot;&gt;
    &lt;option value=&quot;TN&quot;&gt;Tennessee&lt;/option&gt;
    &lt;option value=&quot;VA&quot;&gt;Virginia&lt;/option&gt;
    &lt;option value=&quot;WA&quot;&gt;Washington&lt;/option&gt;
    &lt;option value=&quot;FL&quot;&gt;Florida&lt;/option&gt;
    &lt;option value=&quot;CA&quot;&gt;California&lt;/option&gt;
&lt;/select&gt;
</pre>

          <h2>Example using a store</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select"
                    data-dojo-props="
                    label: 'State',
                    store: {data: [
                        {id: 'TN', text: 'Tennesee'},
                        {id: 'VA', text: 'Virginia'},
                        {id: 'WA', text: 'Washington'},
                        {id: 'FL', text: 'Florida'},
                        {id: 'CA', text: 'California'},
                    ]},
                    placeholder: 'select a state'
                    "
                >
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot;
    data-dojo-props=&quot;
    label: 'State',
    store: {data: [
        {id: 'TN', text: 'Tennesee'},
        {id: 'VA', text: 'Virginia'},
        {id: 'WA', text: 'Washington'},
        {id: 'FL', text: 'Florida'},
        {id: 'CA', text: 'California'},
    ]},
    placeholder: 'select a state'
    &quot;
&gt;
&lt;/select&gt;
</pre>

          <h2>Example with a query filtered list</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select"
                    data-dojo-props="
                    label: 'State',
                    query: {text: /^.*o.*$/},
                    store: {data: [
                        {id: 'TN', text: 'Tennesee'},
                        {id: 'VA', text: 'Virginia'},
                        {id: 'WA', text: 'Washington'},
                        {id: 'FL', text: 'Florida'},
                        {id: 'CA', text: 'California'},
                    ]},
                    placeholder: 'select a state'
                    "
                >
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot;
    data-dojo-props=&quot;
    label: 'State',
    query: {text: /^.*o.*$/},
    store: {data: [
        {id: 'TN', text: 'Tennesee'},
        {id: 'VA', text: 'Virginia'},
        {id: 'WA', text: 'Washington'},
        {id: 'FL', text: 'Florida'},
        {id: 'CA', text: 'California'},
    ]},
    placeholder: 'select a state'
    &quot;
&gt;
&lt;/select&gt;
</pre>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CreditCardExpiry" data-dojo-props="helpMessages: 'please select your credit card expiry date'"/>
             </div>
          </div>

        </section>
