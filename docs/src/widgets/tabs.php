        <!-- Nav, Tabs, & Pills
        ================================================== -->
        <section id="tabs" title="Tabs">
          <div class="page-header">
            <h1>Tabs</h1>
          </div>

          <p>Bring your tabs to life with <code>havok/widget/TabContainer</code>.</p>

          <h3>Tabbable example</h3>
          <p>The <code>title</code> attribute will be used to create an instance of <code>havok/widget/NavTab</code>.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/TabContainer" style="margin-bottom: 18px;">
                <div title="Section 1" class="active">
                  <p>I'm in Section 1.</p>
                </div>
                <div title="Section 2">
                  <p>Howdy, I'm in Section 2.</p>
                </div>
                <div title="Section 3">
                  <p>What up girl, this is Section 3.</p>
                </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/TabContainer&quot; style=&quot;margin-bottom: 18px;&quot;&gt;
    &lt;div title=&quot;Section 1&quot; class=&quot;active&quot;&gt;
      &lt;p&gt;I'm in Section 1.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div title=&quot;Section 2&quot;&gt;
      &lt;p&gt;Howdy, I'm in Section 2.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div title=&quot;Section 3&quot;&gt;
      &lt;p&gt;What up girl, this is Section 3.&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>


          <h3>Tabbable in any direction</h3>

          <p>Use the <code>placement</code> property of <code>havok/widget/TabContainer</code> to alter where the tabs appear.</p>

          <h4>Tabs on the bottom</h4>
          <div class="bs-docs-example">
            <div id="tabContainer1" data-dojo-type="havok/widget/TabContainer"
                data-dojo-props="placement: 'bottom'" style="margin-bottom: 18px;">
                <div title="Section 1" class="active">
                  <p>I'm in Section 1.</p>
                </div>
                <div title="Section 2">
                  <p>Howdy, I'm in Section 2.</p>
                </div>
                <div title="Section 3">
                  <p>What up girl, this is Section 3.</p>
                </div>
            </div>
              <div id="buttonGroup1" data-dojo-type="havok/widget/RadioGroup"
                   data-dojo-props="active: 'bottom', store: {idProperty: 'text', data: [
                        {type: 'button', text: 'top'},
                        {type: 'button', text: 'left'},
                        {type: 'button', text: 'right'},
                        {type: 'button', text: 'bottom'}
                   ]}"
              >
              </div>
            <script type="text/javascript">
                require(['dojo/dom', 'dijit/registry', 'havok/parseComplete!'], function(dom, registry){
                    var tabContainer = registry.byId('tabContainer1'),
                        buttonGroup = registry.byId('buttonGroup1');

                    buttonGroup.on('item-click', function(item){
                        tabContainer.set('placement', item.text);
                    });
                })
            </script>
          </div>
<pre class="prettyprint linenums">
&lt;div id=&quot;tabContainer1&quot; data-dojo-type=&quot;havok/widget/TabContainer&quot;
    data-dojo-props=&quot;placement: 'bottom'&quot;&gt;
    ...
&lt;/div&gt;
&lt;div id=&quot;buttonGroup1&quot; data-dojo-type=&quot;havok/widget/RadioGroup&quot;
     data-dojo-props=&quot;active: 'bottom', store: {idProperty: 'text', data: [
          {type: 'button', text: 'top'},
          {type: 'button', text: 'left'},
          {type: 'button', text: 'right'},
          {type: 'button', text: 'bottom'}
     ]}&quot;
&gt;
&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        var tabContainer = registry.byId('tabContainer1'),
            buttonGroup = registry.byId('buttonGroup1');

        buttonGroup.on('item-click', function(item){
            tabContainer.set('placement', item.text);
        });
    })
&lt;/script&gt;
</pre>

        </section>