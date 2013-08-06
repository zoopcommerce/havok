
        <section id="alerts" title="Alerts">
          <div class="page-header">
            <h1>Alerts</h1>
          </div>

          <p>Use <code>havok/widget/Alert</code> to create and show/hide alerts.</p>

          <h2>Default alert</h2>
          <p>Wrap any text in <code>havok/widget/Alert</code> for a basic warning alert message.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Alert" data-dojo-props="hidden: false">
              <strong>Warning!</strong> Best check your self, you're not looking too good.
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
  &lt;strong&gt;Warning!&lt;/strong&gt; Best check your self, you're not looking too good.
&lt;/div&gt;
</pre>

          <h2>Block alerts</h2>

          <p>Add class <code>alert-block</code> for longer messages.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Alert" class="alert-block" data-dojo-props="hidden: false">
              <h4>Warning!</h4>
              <p>Best check your self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; class=&quot;alert-block&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
  &lt;h4&gt;Warning!&lt;/h4&gt;
  &lt;p&gt;Best check your self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.&lt;/p&gt;
&lt;/div&gt;
</pre>

          <h2>Pretty colors</h2>

          <p>Add sematic classes for different styling:</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Alert" class="alert-info" data-dojo-props="hidden: false">
              <strong>Info!</strong> alert.
            </div>
            <div data-dojo-type="havok/widget/Alert" class="alert-error" data-dojo-props="hidden: false">
              <strong>Error!</strong> alert.
            </div>
            <div data-dojo-type="havok/widget/Alert" class="alert-success" data-dojo-props="hidden: false">
              <strong>Success!</strong> alert.
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; class=&quot;alert-info&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
  &lt;strong&gt;Info!&lt;/strong&gt; alert.
&lt;/div&gt;
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; class=&quot;alert-error&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
  &lt;strong&gt;Error!&lt;/strong&gt; alert.
&lt;/div&gt;
&lt;div data-dojo-type=&quot;havok/widget/Alert&quot; class=&quot;alert-success&quot; data-dojo-props=&quot;hidden: false&quot;&gt;
  &lt;strong&gt;Success!&lt;/strong&gt; alert.
&lt;/div&gt;
</pre>

  <h2>Properties</h2>

            <table class="table table-bordered table-striped">
              <thead>
               <tr>
                 <th style="width: 100px;">Name</th>
                 <th style="width: 50px;">type</th>
                 <th style="width: 50px;">default</th>
                 <th>description</th>
               </tr>
              </thead>
              <tbody>
               <tr>
                 <td>hidden</td>
                 <td>boolean</td>
                 <td>true</td>
                 <td>If an alert is hidden or not.</td>
               </tr>
              </tbody>
            </table>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">name</th>
     <th style="width: 100px;">args</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
        <td>.show()</td>
        <td>-</td>
        <td>Shows an alert.</td>
    </tr>
    <tr>
        <td>.hide()</td>
        <td>-</td>
        <td>Hides the alert.</td>
    </tr>
    <tr>
        <td>.toggle()</td>
        <td>-</td>
        <td>Toggles the alert.</td>
    </tr>
  </tbody>
</table>

        </section>
