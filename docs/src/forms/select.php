        <section id="select" title="Select">
          <div class="page-header">
            <h1>Select</h1>
          </div>

            <p><code>havok/form/Select</code> provides nicely styled select.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select" data-dojo-props="label: 'State', helpMessages: 'please select a state'">
                    <option value="NSW">New South Wales</option>
                    <option value="Qld">Queensland</option>
                    <option value="Vic">Victoria</option>
                    <option value="SA">South Australia</option>
                    <option value="NT">Northern Territory</option>
                    <option value="WA">Western Australia</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="Tas">Tasmania</option>
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot; data-dojo-props=&quot;label: 'State', helpMessages: 'please select a state'&quot;&gt;
    &lt;option value=&quot;NSW&quot;&gt;New South Wales&lt;/option&gt;
    &lt;option value=&quot;Qld&quot;&gt;Queensland&lt;/option&gt;
    &lt;option value=&quot;Vic&quot;&gt;Victoria&lt;/option&gt;
    &lt;option value=&quot;SA&quot;&gt;South Australia&lt;/option&gt;
    &lt;option value=&quot;NT&quot;&gt;Northern Territory&lt;/option&gt;
    &lt;option value=&quot;WA&quot;&gt;Western Australia&lt;/option&gt;
    &lt;option value=&quot;ACT&quot;&gt;Australian Capital Territory&lt;/option&gt;
    &lt;option value=&quot;Tas&quot;&gt;Tasmania&lt;/option&gt;
&lt;/select&gt;
</pre>

          <h2>Example with predefined selection</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select" data-dojo-props="label: 'State', value: 'NSW'">
                    <option value="NSW">New South Wales</option>
                    <option value="Qld">Queensland</option>
                    <option value="Vic">Victoria</option>
                    <option value="SA">South Australia</option>
                    <option value="NT">Northern Territory</option>
                    <option value="WA">Western Australia</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="Tas">Tasmania</option>
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Select&quot; data-dojo-props=&quot;label: 'State', value: 'NSW'&quot;&gt;
    ...
&lt;/select&gt;
</pre>

          <h2>Example using a store</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Select"
                    data-dojo-props="
                    label: 'State',
                    store: {data: [
                        {id: 'NSW', text: 'New South Wales'},
                        {id: 'Qld', text: 'Queensland'},
                        {id: 'Vic', text: 'Victoria'},
                        {id: 'SA', text: 'South Australia'},
                        {id: 'NT', text: 'Northern Territory'},
                        {id: 'WA', text: 'Western Australia'},
                        {id: 'ACT', text: 'Australian Capital Territory'},
                        {id: 'Tas', text: 'Tasmania'}
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
        {id: 'NSW', text: 'New South Wales'},
        {id: 'Qld', text: 'Queensland'},
        {id: 'Vic', text: 'Victoria'},
        {id: 'SA', text: 'South Australia'},
        {id: 'NT', text: 'Northern Territory'},
        {id: 'WA', text: 'Western Australia'},
        {id: 'ACT', text: 'Australian Capital Territory'},
        {id: 'Tas', text: 'Tasmania'}
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
                    query: {text: /^.*T.*$/},
                    store: {data: [
                        {id: 'NSW', text: 'New South Wales'},
                        {id: 'Qld', text: 'Queensland'},
                        {id: 'Vic', text: 'Victoria'},
                        {id: 'SA', text: 'South Australia'},
                        {id: 'NT', text: 'Northern Territory'},
                        {id: 'WA', text: 'Western Australia'},
                        {id: 'ACT', text: 'Australian Capital Territory'},
                        {id: 'Tas', text: 'Tasmania'}
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
    query: {text: /^.*T.*$/},
    store: {data: [
        {id: 'NSW', text: 'New South Wales'},
        {id: 'Qld', text: 'Queensland'},
        {id: 'Vic', text: 'Victoria'},
        {id: 'SA', text: 'South Australia'},
        {id: 'NT', text: 'Northern Territory'},
        {id: 'WA', text: 'Western Australia'},
        {id: 'ACT', text: 'Australian Capital Territory'},
        {id: 'Tas', text: 'Tasmania'}
    ]},
    placeholder: 'select a state'
    &quot;
&gt;
&lt;/select&gt;
</pre>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CreditCardExpiry" data-dojo-props="label: 'Card Expiry', helpMessages: 'please select your credit card expiry date'"/>
             </div>
          </div>

        </section>
