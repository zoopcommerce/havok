<section id="using-form-widgets" title="Using Form Widgets">
  <div class="page-header">
    <h1>Using Form Widgets</h1>
  </div>

    <p>All form widgets have a number of common behaviors.</p>

          <h2>Labels</h2>

          <p>Add a label to any widget</p>
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

          <h2>Help messages</h2>

          <p>Add a single help message</p>
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

          <p>Add a multiple help messages</p>
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

</section>
