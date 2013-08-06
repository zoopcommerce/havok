
        <section id="dropdowns" title="Dropdowns">
          <div class="page-header">
            <h1>Dropdown menus</h1>
          </div>

            <h2>DropdownContainer</h2>

         <p>The <code>havok/widget/DropdownContainer</code> widget. An empty dropdown that can be filled with whatever content you choose.</p>

          <h2>Example</h2>
          <p>Toggleable, contextual menu for displaying anything.</p>

          <h3>Declarative Example</h3>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
              <div data-dojo-type="havok/widget/DropdownContainer" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                  <div>
                    <h5>Stuff here</h5>
                    <p>This is stuff inside a dropdown</p>
                  </div>
              </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/DropdownContainer&quot;&gt;
    &lt;div&gt;
      &lt;h5&gt;Stuff here&lt;/h5&gt;
      &lt;p&gt;This is stuff inside a dropdown&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>

          <h2>Dropdown</h2>

         <p>The <code>havok/widget/Dropdown</code> widget. Inherits from <code>havok/widget/_DropdownBase</code>. Shows a list of links.</p>
  <h2>Properties</h2>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">name</th>
     <th style="width: 50px;">type</th>
     <th style="width: 50px;">default</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
        <td>innerHTML</td>
        <td>string</td>
        <td>undefined</td>
        <td>Can be used to populate a Dropdown when creating it programatically.</td>
    </tr>
    <tr>
        <td>templateString</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/Dropdown.html<code></td>
        <td>The base template for a Dropdown.</td>
    </tr>
    <tr>
        <td>linkTemplate</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/DropdownLink.html</code></td>
        <td>The base template for an A inside a Dropdown.</td>
    </tr>
    <tr>
        <td>dividerTemplate</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/Divider.html</code></td>
        <td>The base template for a HR inside a Dropdown.</td>
    </tr>
  </tbody>
</table>

  <h2>Events</h2>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">name</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
        <td>item-click</td>
        <td>Fires when an item is clicked.</td>
    </tr>
  </tbody>
</table>

          <h2>Example</h2>
          <p>Toggleable, contextual menu for displaying lists of links.</p>

          <h3>Declarative Example</h3>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
              <ul data-dojo-type="havok/widget/Dropdown" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                <li><a href="">Action</a></li>
                <li><a href="">Another action</a></li>
                <li><a href="">Something else here</a></li>
                <hr />
                <li><a href="">Separated link</a></li>
              </ul>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type="havok/widget/Dropdown"&gt;
  &lt;li&gt;&lt;a href=""&gt;Action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=""&gt;Another action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=""&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;hr /&gt;
  &lt;li&gt;&lt;a href=""&gt;Separated link&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>
          <h3>Programatic Example</h3>
          <div class="bs-docs-example">
            <div id="dropdown1" class="dropdown clearfix">
                <script type="text/javascript">
                    require(['dojo/dom', 'havok/widget/Dropdown', 'dojo/domReady!'], function(dom, Dropdown){
                        var dropdown = new Dropdown({
                            innerHTML: [
                                '<li><a href="">Action</a></li>',
                                '<li><a href="">Another action</a></li>',
                                '<li><a href="">Something else here</a></li>',
                                '<hr />',
                                '<li><a href="">Separated link</a></li>'
                            ].join(''),
                            style: 'display: block; position: static; margin-bottom: 5px; *width: 180px;'
                        });
                        dom.byId('dropdown1').appendChild(dropdown.domNode);
                        dropdown.startup();
                    })
                </script>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div id=&quot;dropdown1&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dojo/dom', 'havok/widget/Dropdown', 'dojo/domReady!'], function(dom, Dropdown){
        var dropdown = new Dropdown({
            innerHTML: [
                '&lt;li&gt;&lt;a tabindex=&quot;-1&quot; href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;',
                '&lt;li&gt;&lt;a tabindex=&quot;-1&quot; href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;',
                '&lt;li&gt;&lt;a tabindex=&quot;-1&quot; href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;',
                '&lt;hr /&gt;',
                '&lt;li&gt;&lt;a tabindex=&quot;-1&quot; href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;'
            ].join('')
        });
        dom.byId('dropdown1').appendChild(dropdown.domNode);
        dropdown.startup();
    })
&lt;/script&gt;
</pre>

          <hr class="bs-docs-separator">

          <h2>Click events</h2>
          <p>If the <code>href</code> attribute is an empty string, the active property will be changed. If the <code>href</code> attribute is not empty, the link will be followed. Eg:</p>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
                <ul data-dojo-type="havok/widget/Dropdown" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                  <li><a href="">item 1</a></li>
                  <li><a href="">item 2</a></li>
                  <li><a href="">item 3</a></li>
                  <li><a href="#dropdowns">#dropdowns anchor</a></li>
                  <li><a href="http://github.com">github.com</a></li>
                </ul>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;item 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;item 2&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;item 3&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;#dropdowns&quot;&gt;#dropdowns anchor&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;http://github.com&quot;&gt;github.com&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <p>To listen to click events, use the <code>.on('item-click', callback)</code> method. Eg:
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
                <ul id="dropdownClick1" data-dojo-type="havok/widget/Dropdown" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                  <li><a href="">item 0</a></li>
                  <li><a href="">item 1</a></li>
                  <li><a href="">item 2</a></li>
                </ul>
                <script type="text/javascript">
                    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                        registry.byId('dropdownClick1').on('item-click', function(item){
                            alert('Just clicked item: ' + item.id)
                        })
                    })
                </script>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul id=&quot;dropdownClick1&quot; data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
    ...
&lt;/ul&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        registry.byId('dropdownClick1').on('item-click', function(item){
            alert('Just clicked item: ' + item.id)
        })
    })
&lt;/script&gt;
</pre>

          <hr class="bs-docs-separator">



          <h2>Options</h2>

          <h3>Disabled menu options</h3>
          <p>Add <code>.disabled</code> to a <code>&lt;li&gt;</code> in the dropdown to disable the link, or set <code>'type': 'disabled'</code> on the store item. Disabled links are not clickable.</p>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
              <ul data-dojo-type="havok/widget/Dropdown" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                <li><a href="">Regular link</a></li>
                <li class="disabled"><a href="">Disabled link</a></li>
                <li><a href="">Another link</a></li>
              </ul>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type="havok/widget/Dropdown"&gt;
  &lt;li&gt;&lt;a href=""&gt;Regular link&lt;/a&gt;&lt;/li&gt;
  &lt;li class="disabled"&gt;&lt;a href=""&gt;Disabled link&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=""&gt;Another link&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h3>Sub menus on dropdowns</h3>
          <p>To add an extra level of dropdown menus, wrap the submenu in <code>havok/widget/DropdownSubmenu</code></p>
          <p><span class="label label-info">Heads up!</span> <code>havok/widget/DropdownSubmenu</code> inherits from <code>havok/widget/DropdownToggle</code>, and so exposes all the same methods.</p>

          <h4>Example</h4>
          <div class="bs-docs-example bs-docs-example-submenus">

            <div class="pull-left">
              <p class="muted">Default</p>
              <div class="dropdown clearfix">
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li data-dojo-type="havok/widget/DropdownSubmenu">
                    <a href="">More options</a>
                    <ul data-dojo-type="havok/widget/Dropdown">
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div class="pull-left">
              <p class="muted">Dropup</p>
              <div class="dropdown clearfix">
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li data-dojo-type="havok/widget/DropdownSubmenu" data-dojo-props="placement: {placementNode: 'bottom-right', dropdown: 'bottom-left'}">
                    <a href="">More options</a>
                    <ul data-dojo-type="havok/widget/Dropdown">
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div class="pull-left">
              <p class="muted">Left submenu</p>
              <div class="dropdown">
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li data-dojo-type="havok/widget/DropdownSubmenu" data-dojo-props="placement: {placementNode: 'top-left', dropdown: 'top-right'}">
                    <a href="">More options</a>
                    <ul data-dojo-type="havok/widget/Dropdown">
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                      <li><a href="">Second level link</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;hr /&gt;
  &lt;li data-dojo-type=&quot;havok/widget/DropdownSubmenu&quot;&gt;
    &lt;a href=&quot;&quot;&gt;More options&lt;/a&gt;
    &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Second level link&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Second level link&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Second level link&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Second level link&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Second level link&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h4>Example with a store</h4>
          <p>Use the <code>type: 'dropdown'</code> to mark parent items. Use <code>parent: id</code> property to specify child items in the store. Now that's nice syntax!</p>

          <div class="bs-docs-example bs-docs-example-submenus">
              <div class="dropdown clearfix">
                <ul data-dojo-type="havok/widget/Dropdown"
                    data-dojo-props="
                        store: {
                            data: [
                                {id: 0, text: 'Action'},
                                {id: 1, text: 'Another Action'},
                                {id: 2, text: 'Something else here'},
                                {id: 3, type: 'divider'},
                                {id: 4, type: 'dropdown', text: 'More options'},
                                {id: 5, parent: 4, text: 'Second level link'},
                                {id: 6, parent: 4, text: 'Second level link'},
                                {id: 7, parent: 4, text: 'Second level link'},
                                {id: 8, parent: 4, text: 'Second level link'}
                            ]
                        }
                    "
                >
                </ul>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
    data-dojo-props=&quot;
        store: {
            data: [
                {id: 0, text: 'Action'},
                {id: 1, text: 'Another Action'},
                {id: 2, text: 'Something else here'},
                {id: 3, type: 'divider'},
                {id: 4, type: 'dropdown', text: 'More options'},
                {id: 5, parent: 4, text: 'Second level link'},
                {id: 6, parent: 4, text: 'Second level link'},
                {id: 7, parent: 4, text: 'Second level link'},
                {id: 8, parent: 4, text: 'Second level link'}
            ]
        }
    &quot;
&gt;
&lt;/ul&gt;
</pre>

          <h2>Date Dropdown</h2>

          <div class="bs-docs-example bs-docs-example-submenus">
                <script type="text/javascript">
                    require(['dijit/registry', 'dojo/dom', 'havok/parseComplete!'], function(registry, dom){
                        registry.byId('dateDropdown1').watch('date', function(property, oldValue, newValue){
                            dom.byId('dateValue1').innerHTML = newValue;
                        })
                    })
                </script>
              <div class="dropdown clearfix">
                <div data-dojo-type="havok/widget/DateDropdown" id="dateDropdown1">
                </div>
              </div>
              <div class="well"><p>Date: <span id="dateValue1"></span></p></div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/DateDropdown&quot;&gt;
&lt;/div&gt;
</pre>

          <h2>Markup</h2>
          <p>To use a dropdown menu, you would normally place it inside a <code>havok/widget/DropdownToggle</code>.</p>

        </section>
