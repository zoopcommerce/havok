        <section id="typeahead" title="Typeahead">
          <div class="page-header">
            <h1>Typeahead</h1>
          </div>

            <p><code>havok/form/Typeahead</code> provides a filtering select style input.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Typeahead"
                    data-dojo-props="label: 'State', helpMessages: 'please type a state'"
                >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="MV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="ND">North Dakota</option>
                    <option value="NC">North Carolina</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Typeahead&quot;
    data-dojo-props=&quot;label: 'State', helpMessages: 'please type a state'&quot;
&gt;
    &lt;option value=&quot;AL&quot;&gt;Alabama&lt;/option&gt;
    &lt;option value=&quot;AK&quot;&gt;Alaska&lt;/option&gt;
    &lt;option value=&quot;AZ&quot;&gt;Arizona&lt;/option&gt;
    ...
&lt;/select&gt;
</pre>

          <h2>Using a store</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Typeahead"
                    data-dojo-props="label: 'State', store: 'demostates'"
                >
                </select>
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Typeahead&quot;
    data-dojo-props=&quot;label: 'State', store: 'demostates'&quot;
&gt;
&lt;/select&gt;
</pre>

          <h2>With a validator</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Typeahead" required
                    data-dojo-props="label: 'State', store: 'demostates'"
                >
                </select>
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Typeahead&quot; required
    data-dojo-props=&quot;label: 'State', store: 'demostates'&quot;
&gt;
&lt;/select&gt;
</pre>

          <h2>With appendages</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <div data-dojo-type="havok/form/Typeahead"
                    data-dojo-props="store: 'demostates'"
                >
                    <label>State</label>
                    <button>pre1</button>
                    <select></select>
                    <button>app1</button>
                </div>
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/Typeahead&quot;
    data-dojo-props=&quot;store: 'demostates'&quot;
&gt;
    &lt;label&gt;State&lt;/label&gt;
    &lt;button&gt;pre1&lt;/button&gt;
    &lt;select&gt;&lt;/select&gt;
    &lt;button&gt;app1&lt;/button&gt;
&lt;/div&gt;
</pre>

          <h2>With queryThrottle and minLength</h2>

          <p><code>queryThrottle</code> will limit the rate of queries against the store. In this example, there will be a minimum of 1500 milliseconds between queries (quite slow). Also, <code>minLength</code> sets the minimum number of characters before the Typeahead will give suggestions.</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <select data-dojo-type="havok/form/Typeahead"
                    data-dojo-props="label: 'State', store: 'demostates', queryThrottle: 1500, minLength: 2"
                ></select>
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;select data-dojo-type=&quot;havok/form/Typeahead&quot;
    data-dojo-props=&quot;label: 'State', store: 'demostates', queryThrottle: 1500, minLength: 2&quot;
&gt;&lt;/select&gt;
</pre>

        </section>
