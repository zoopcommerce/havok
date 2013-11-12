
        <section id="textbox" title="Textbox">
          <div class="page-header">
            <h1>Textbox</h1>
          </div>
<!--
          <p>Use <code>havok/form/Textbox</code> to collect simple text data.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox" value="hello"/>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type="havok/form/TextBox" value="hello"/&gt;
</pre>

          <h2>Placeholders</h2>

          <h3>Using properties</h3>
          <div class="bs-docs-example" class="form-horizontal">
              <div class="form-horizontal">
                  <input data-dojo-type="havok/form/TextBox"
                         data-dojo-props="
                            label: 'name',
                            placeholder: 'Enter your name'"
                  />
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
          label: 'name',
          placeholder: 'Enter your name'&quot;
/&gt;
</pre>

          <h3>Using markup</h3>
          <div class="bs-docs-example" class="form-horizontal">
              <div class="form-horizontal">
                  <div data-dojo-type="havok/form/TextBox">
                    <label>name</label>
                    <input placeholder="Enter your name"/>
                  </div>
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;&gt;
  &lt;label&gt;name&lt;/label&gt;
  &lt;input placeholder=&quot;Enter your name&quot;/&gt;
&lt;/div&gt;
</pre>
-->
          <h2>Filters</h2>

          <p>Filters can be applied value displayed in the textbox. For more information about filters, see the filters section of the Data Quality documentation.</p>

          <p>Note: The <code>Trim</code> filter is applied on all textboxes by default.</p>

          <p>Example with an uppercase filter set:</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       value="John Smith"
                       data-dojo-props="
                           label: 'name',
                           filter: 'Uppercase'
                       "
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       value=&quot;John Smith&quot;
       data-dojo-props=&quot;
           label: 'name',
           filter: 'Uppercase'
       &quot;
/&gt;
</pre>

          <p>Set a filter chain:</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       value="    John Smith    "
                       data-dojo-props="
                           label: 'name',
                           filter: ['Trim', 'Uppercase']
                       "
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       value=&quot;    John Smith    &quot;
       data-dojo-props=&quot;
           label: 'name',
           filter: ['Trim', 'Uppercase']
       &quot;
/&gt;
</pre>
          <p>Filters are created by <code>havok/filter/factory</code> which supports abreviated names for the filters bundled with havok. To set your own custom filter, pass the complete module name. Eg <code>filters: 'My/Filter/Module'</code></p>

          <h2>Appendages</h2>

          <h3>Using Properties</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       data-dojo-props="
                           label: 'name',
                           prepend: 'pre',
                           append: ['app1', 'app2']
                       "
                />
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;
           label: 'name',
           prepend: 'pre',
           append: ['app1', 'app2']
       &quot;
/&gt;
</pre>

          <h3>Using markup</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                  <div data-dojo-type="havok/form/TextBox">
                    <label><strong>name</strong></label>
                    <span><b>p</b>re1</span>
                    <input />
                    <span><b>a</b>ppend 1</span>
                    <span><b>a</b>ppend 2</span>
                  </div>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;&gt;
  &lt;label&gt;&lt;strong&gt;name&lt;/strong&gt;&lt;/label&gt;
  &lt;span&gt;&lt;b&gt;p&lt;/b&gt;re1&lt;/span&gt;
  &lt;input /&gt;
  &lt;span&gt;&lt;b&gt;a&lt;/b&gt;ppend 1&lt;/span&gt;
  &lt;span&gt;&lt;b&gt;a&lt;/b&gt;ppend 2&lt;/span&gt;
&lt;/div&gt;
</pre>

          <h3>Buttons</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <div data-dojo-type="havok/form/TextBox"
                       data-dojo-props="label: 'name'"
                >
                    <button>pre1</button>
                    <input />
                    <button>append 1</button>
                    <button>append 2</button>
                </div>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;label: 'name'&quot;
&gt;
    &lt;button&gt;pre1&lt;/button&gt;
    &lt;input /&gt;
    &lt;button&gt;append 1&lt;/button&gt;
    &lt;button&gt;append 2&lt;/button&gt;
&lt;/div&gt;
</pre>

          <h3>Dropdowns</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <div data-dojo-type="havok/form/TextBox"
                       data-dojo-props="label: 'name'"
                >
                    <input />
                    <button class="btn" data-dojo-type="havok/widget/DropdownToggle">
                        Action <span class="caret"></span>
                        <ul class="hide" data-dojo-type="havok/widget/Dropdown">
                            <li><a href="">Action</a></li>
                            <li><a href="">Another action</a></li>
                            <li><a href="">Something else here</a></li>
                            <hr />
                            <li><a href="">Separated link</a></li>
                        </ul>
                    </button>
                </div>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;
       data-dojo-props=&quot;label: 'name'&quot;
&gt;
    &lt;input /&gt;
    &lt;button class=&quot;btn&quot; data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
        Action &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
        &lt;ul class=&quot;hide&quot; data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
            &lt;hr /&gt;
            &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/button&gt;
&lt;/div&gt;
</pre>

          <h3>Split dropdowns</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <div data-dojo-type="havok/form/TextBox"
                       data-dojo-props="label: 'name'"
                >
                    <input />
                    <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                        <button class="btn">Action</button>
                        <button data-dojo-attach-point="button" class="btn"><span class="caret"></span></button>
                        <ul class="hide" data-dojo-type="havok/widget/Dropdown">
                            <li><a href="">Action</a></li>
                            <li><a href="">Another action</a></li>
                            <li><a href="">Something else here</a></li>
                            <hr />
                            <li><a href="">Separated link</a></li>
                        </ul>
                    </div>
                </div>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextBox&quot;
        data-dojo-props=&quot;label: 'name'&quot;
 &gt;
     &lt;input /&gt;
     &lt;div class=&quot;btn-group&quot; data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
         &lt;button class=&quot;btn&quot;&gt;Action&lt;/button&gt;
         &lt;button data-dojo-attach-point=&quot;button&quot; class=&quot;btn&quot;&gt;&lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;&lt;/button&gt;
         &lt;ul class=&quot;hide&quot; data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
             &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
             &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
             &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
             &lt;hr /&gt;
             &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
         &lt;/ul&gt;
     &lt;/div&gt;
 &lt;/div&gt;
</pre>

          <h3>Programatically change appendages</h3>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input id="appendageExample"
                    data-dojo-type="havok/form/TextBox"
                    data-dojo-props="
                        label: 'name',
                        prepend: 'pre',
                        append: ['app1', 'app2']
                    "
                />
              </div>
                <div id="buttonGroup1" data-dojo-type="havok/widget/ButtonGroup"
                data-dojo-props="active: 'bottom', store: {data: [
                {id: 1, type: 'button', text: '.set(\'prepend\', [\'1\', \'2\']'},
                {id: 2, type: 'button', text: '.set(\'append\', \'3\')'},
                {id: 3, type: 'button', text: 'addPrependage(\'pre\')'},
                {id: 4, type: 'button', text: 'addAppendage(\'post\')'}
                ]}"
                >
                </div>
            <script type="text/javascript">
                require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                    var buttonGroup = registry.byId('buttonGroup1');
                    var textbox = registry.byId('appendageExample');

                    buttonGroup.on('item-click', function(item){
                        if (item.id == 1){
                            textbox.set('prepend', ['1', '2']);
                        } else if (item.id == 2){
                            textbox.set('append', '3');
                        } else if (item.id == 3){
                            textbox.addPrependage('pre');
                        } else if (item.id == 4){
                            textbox.addAppendage('post');
                        }
                    });
                })
            </script>
          </div>

          <h2>Style the textbox</h2>
          <div class="bs-docs-example">
              <div class="form-horizontal">
                <input data-dojo-type="havok/form/TextBox"
                       class="span2"
                       data-dojo-props="label: 'name'"
                />
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
       class=&quot;span2&quot;
       data-dojo-props=&quot;label: 'name'&quot;
/&gt;
</pre>

        </section>
