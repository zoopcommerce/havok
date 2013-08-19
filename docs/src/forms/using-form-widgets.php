<section id="using-form-widgets" title="Using Form Widgets">
  <div class="page-header">
    <h1>Using Form Widgets</h1>
  </div>

    <p>All form widgets have a number of common behaviors.</p>

    <h2>Flow</h2>

    <h3>Block</h3>

    <p>By default all form widgets use block positioning, and will flow each one below the other:</p>

          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input
                   data-dojo-type="havok/form/TextBox"
                   placeholder="input 2"
                />
                <input
                   data-dojo-type="havok/form/TextBox"
                   placeholder="input 2"
                />
              </div>
          </div>

    <h3>Inline</h3>

    <p>Use the <code>inline: true</code> property to make inputs display inline for compact forms:</p>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input
                   data-dojo-type="havok/form/TextBox"
                   data-dojo-props="inline: true"
                   placeholder="input 1"
                />
                <input
                   data-dojo-type="havok/form/TextBox"
                   data-dojo-props="inline: true"
                   placeholder="input 2"
                />
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;input
   data-dojo-type=&quot;havok/form/TextBox&quot;
   data-dojo-props=&quot;inline: true&quot;
   placeholder=&quot;input 1&quot;
/&gt;
&lt;input
   data-dojo-type=&quot;havok/form/TextBox&quot;
   data-dojo-props=&quot;inline: true&quot;
   placeholder=&quot;input 2&quot;
/&gt;
</pre>
          <h2>Labels</h2>

          <p>Add a label to any form widget</p>

          <h3>Using Properties</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input
                   data-dojo-type="havok/form/TextBox"
                   data-dojo-props="label: 'name'"
                />
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;label: 'name'&quot;
/&gt;
</pre>

          <h3>Using markup</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                  <div data-dojo-type="havok/form/TextBox">
                    <label>name</label>
                    <input />
                  </div>
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;&gt;
  &lt;label&gt;name&lt;/label&gt;
  &lt;input /&gt;
&lt;/div&gt;
</pre>

          <h2>Help messages</h2>

          <h3>Single help message</h3>
            <div class="bs-docs-example">
                <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="
                           label: 'name',
                           helpMessages: 'Please enter your full name'
                       "
                />
                </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
           label: 'name',
           helpMessages: 'Please enter your full name'
       &quot;
/&gt;
</pre>

          <h3>Multiple help messages</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="
                           label: 'name',
                           helpMessages: [
                               'Please enter your full name',
                               'eg: John Smith'
                           ]
                       "
                />
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
           label: 'name',
           helpMessages: [
               'Please enter your full name',
               'eg: John Smith'
           ]
       &quot;
/&gt;
</pre>

          <h3>Using markup</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <div data-dojo-type="havok/form/TextBox">
                    <label>name</label>
                    <input />
                    <span data-dojo-attach-point="helpMessages">
                        <span>Please enter your full name</span>
                        <span>eg: John Smith</span>
                    </span>
                </div>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;&gt;
    &lt;label&gt;name&lt;/label&gt;
    &lt;input /&gt;
    &lt;span data-dojo-attach-point=&quot;helpMessages&quot;&gt;
        &lt;span&gt;Please enter your full name&lt;/span&gt;
        &lt;span&gt;eg: John Smith&lt;/span&gt;
    &lt;/span&gt;
&lt;/div&gt;
</pre>

          <h2>Message position</h2>

          <p>There are three possible values for <code>messagePosition</code>:</p>

          <ul>
              <li><b>auto:</b> if the message is one line, display inline. If it is multiline, display block</li>
              <li><b>inline:</b> always display message inline. If the message is more than one line, only the first will be shown.</li>
              <li><b>block:</b> always display message as block, even when there is only one line.</li>
          </ul>
            <div class="bs-docs-example">
                <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="
                           label: 'name',
                           messagePosition: 'block',
                           helpMessages: 'Please enter your full name'
                       "
                />
                </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
           label: 'name',
           messagePosition: 'block',
           helpMessages: 'Please enter your full name'
       &quot;
/&gt;
</pre>

          <h2>Required star</h2>

          <h3>Using properties</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="
                           label: 'name',
                           requiredStar: true
                       "
                />
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
           label: 'name',
           requiredStar: true
       &quot;
/&gt;
</pre>

          <h3>Using markup</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="label: 'name'"
                       required
                />
              </div>
          </div>

<pre class="prettyprint linenums">

</pre>

</section>
