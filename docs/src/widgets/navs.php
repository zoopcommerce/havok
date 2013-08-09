        <!-- Nav, Tabs, & Pills
        ================================================== -->
        <section id="navs" title="Navs">
          <div class="page-header">
            <h1>Nav: tabs, pills, and lists</h1>
          </div>

          <h2>Basic tabs</h2>
          <p>Use <code>havok/widget/NavTab</code>:</p>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavTab">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Profile</a></li>
              <li><a href="">Messages</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavTab&quot;&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h3>Basic pills</h3>
          <p>Use <code>havok/widget/NavPill</code>:</p>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavPill">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Profile</a></li>
              <li><a href="">Messages</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavPill&quot;&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h3>Click events</h3>
          <p>If the <code>href</code> attribute is an empty string, the active nav item will be changed. If the <code>href</code> attribute is not empty, the link will be followed. Eg:</p>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavTab">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">tab 1</a></li>
              <li><a href="">tab 2</a></li>
              <li><a href="#navs">#navs anchor</a></li>
              <li><a href="http://github.com">github.com</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavTab&quot;&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 2&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;#navs&quot;&gt;#navs anchor&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;http://github.com&quot;&gt;github.com&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <p>To listen to click events, use the <code>.on('item-click', callback)</code> method. Eg:
          <div class="bs-docs-example">
            <ul id="navTabs1" data-dojo-type="havok/widget/NavTab">
              <li class="active"><a href="">tab 0</a></li>
              <li><a href="">tab 1</a></li>
              <li><a href="">tab 2</a></li>
            </ul>
            <script type="text/javascript">
                require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                    registry.byId('navTabs1').on('item-click', function(item){
                        alert('Just clicked item: ' + item.id)
                    })
                })
            </script>
          </div>
<pre class="prettyprint linenums">
&lt;ul id=&quot;navTabs1&quot; data-dojo-type=&quot;havok/widget/NavTab&quot;&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;tab 0&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 2&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        registry.byId('navTabs1').on('item-click', function(item){
            alert('Just clicked item: ' + item.id)
        })
    })
&lt;/script&gt;
</pre>

          <h4>Watching active item</h4>
          <p>To watch the active item in code, use the <code>.watch('active', callback)</code> method. Note, this is different to <code>.on('item-click', callback)</code>, as it will only fire when the active item is changed, not on every click. Eg:
          <div class="bs-docs-example">
            <ul id="navTabs2" data-dojo-type="havok/widget/NavTab">
              <li class="active"><a href="">tab 0</a></li>
              <li><a href="">tab 1</a></li>
              <li><a href="">tab 2</a></li>
            </ul>
            <script type="text/javascript">
                require(['dijit/registry', 'havok/parseComplete!'], function(registry){
                    registry.byId('navTabs2').watch('active', function(property, oldValue, newValue){
                        alert('Previously active tab: ' + oldValue.id + '. Currently active tab: ' + newValue.id)
                    })
                })
            </script>
          </div>
<pre class="prettyprint linenums">
&lt;ul id=&quot;navTabs1&quot; data-dojo-type=&quot;havok/widget/NavTab&quot; &gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;tab 0&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;tab 2&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dijit/registry', 'havok/parseComplete!'], function(registry){
        registry.byId('navTabs1').watch('active', function(property, oldValue, newValue){
            alert('Previously active tab: ' + oldValue.id + '. Currently active tab: ' + newValue.id)
        })
    })
&lt;/script&gt;
</pre>


          <h3>Component alignment</h3>
          <p>To align nav links, use the <code>.pull-left</code> or <code>.pull-right</code> utility classes. Both classes will add a CSS float in the specified direction.</p>

          <h3>Programatic example</h3>
          <div class="bs-docs-example">
            <div id="nav1"></div>
            <script type="text/javascript">
                require(['dojo/dom', 'havok/widget/NavPill', 'dojo/domReady!'], function(dom, NavPill){
                    var nav = new NavPill({
                        innerHTML: [
                            '<li class="active"><a href="">Home</a></li>',
                            '<li><a href="">Profile</a></li>',
                            '<li><a href="">Messages</a></li>'
                        ].join('')
                    });
                    dom.byId('nav1').appendChild(nav.domNode);
                    nav.startup();
                })
            </script>
          </div>
<pre class="prettyprint linenums">
<div id="nav1"></div>
&lt;div id=&quot;nav1&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require(['dojo/dom', 'havok/widget/NavPill', 'dojo/domReady!'], function(dom, NavPill){
        var nav = new NavPill({
            innerHTML: [
                '&lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;',
                '&lt;li&gt;&lt;a href=&quot;&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;',
                '&lt;li&gt;&lt;a href=&quot;&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;'
            ].join('')
        });
        dom.byId('nav1').appendChild(nav.domNode);
        nav.startup();
    })
&lt;/script&gt;
</pre>

          <h3>Disabled state</h3>
          <p>For any nav component (tabs, pills, or list), add <code>.disabled</code> to the <code>li</code> or set <code>'type': 'disabled'</code> on the store item for <strong>gray links and no hover effects</strong>. Links will not be clickable.</p>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavPill">
              <li><a href="">Clickable link</a></li>
              <li><a href="">Clickable link</a></li>
              <li class="disabled"><a href="">Disabled link</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type="havok/widget/NavPill"&gt;
  ...
  &lt;li class="disabled"&gt;&lt;a href=""&gt;Home&lt;/a&gt;&lt;/li&gt;
  ...
&lt;/ul&gt;
</pre>

          <hr class="bs-docs-separator">

          <h2>Data Store</h2>
          <p>Nav uses a <code>havok/widget/_StoreMixin</code> for the nav items.<p>

          <h3>Example</h3>
          <p>The active nav item can be set using the <code>data-dojo-props: active</code> attribute</p>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavPill"
                data-dojo-props="
                    active: 'home',
                    store: {
                        idProperty: 'text',
                        data: [
                            {text: 'home'},
                            {href: '#navs', text: '#navs anchor'},
                            {type: 'disabled', text: 'disabled'}
                        ]
                    }"
            ></ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavPill&quot;
    data-dojo-props=&quot;
        active: 'home',
        store: {
            idProperty: 'text',
            data: [
                {text: 'home'},
                {href: '#navs', text: '#navs anchor'},
                {type: 'disabled', text: 'distabled'}
            ]
        }&quot;
&gt;&lt;/ul&gt;
</pre>

          <hr class="bs-docs-separator">


          <h2>Stackable</h2>
          <p>As tabs and pills are horizontal by default, just add a class, <code>.nav-stacked</code>, to make them appear vertically stacked.</p>

          <h3>Stacked tabs</h3>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavTab" class="nav-stacked">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Profile</a></li>
              <li><a href="">Messages</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type="havok/widget/NavTab" class="nav-stacked"&gt;
  ...
&lt;/ul&gt;
</pre>

          <h3>Stacked pills</h3>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavPill" class="nav-stacked">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Profile</a></li>
              <li><a href="">Messages</a></li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type="havok/widget/NavPill" class="nav-stacked"&gt;
  ...
&lt;/ul&gt;
</pre>


          <hr class="bs-docs-separator">


          <h2>Dropdowns</h2>
          <p>Add dropdown menus with the <code>havok/widget/DropdownToggle</code> widget.</p>

          <h3>Tabs with dropdowns</h3>
          <div class="bs-docs-example">
            <ul data-dojo-type="havok/widget/NavTab">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Help</a></li>
              <li data-dojo-type="havok/widget/DropdownToggle">
                <a href="">Dropdown <b class="caret"></b></a>
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li><a href="">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavTab&quot; &gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Help&lt;/a&gt;&lt;/li&gt;
  &lt;li data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
    &lt;a href=&quot;&quot;&gt;Dropdown &lt;b class=&quot;caret&quot;&gt;&lt;/b&gt;&lt;/a&gt;
    &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
      &lt;hr /&gt;
      &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h3>Pills with dropdowns</h3>
          <div class="bs-docs-example">
           <ul data-dojo-type="havok/widget/NavPill">
              <li class="active"><a href="">Home</a></li>
              <li><a href="">Help</a></li>
              <li data-dojo-type="havok/widget/DropdownToggle">
                <a href="">Dropdown <b class="caret"></b></a>
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li><a href="">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavPill&quot; &gt;
   &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
   &lt;li&gt;&lt;a href=&quot;&quot;&gt;Help&lt;/a&gt;&lt;/li&gt;
   &lt;li data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
     &lt;a href=&quot;&quot;&gt;Dropdown &lt;b class=&quot;caret&quot;&gt;&lt;/b&gt;&lt;/a&gt;
     &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
       &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
       &lt;hr /&gt;
       &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
   &lt;/li&gt;
 &lt;/ul&gt;
</pre>

          <h3>Nav dropdowns created from a store</h3>
          <p>Using a store, add dropdown menus with the <code>type: 'dropdown'</code> property.</p>
          <div class="bs-docs-example">
              <ul data-dojo-type="havok/widget/NavPill"
                  data-dojo-props="
                    active: 'home',
                    store: {
                        idProperty: 'text',
                        data: [
                            {text: 'home'},
                            {type: 'dropdown', text: 'help'},
                            {text: 'action', parent: 'Help'},
                            {text: 'another action', parent: 'help'},
                            {text: 'something else here', parent: 'help'},
                            {type: 'divider', parent: 'help'},
                            {type: 'dropdown', text: 'deeper submenu', parent: 'help'},
                            {text: 'Deep menu 1', parent: 'deeper submenu'},
                            {text: 'Deep menu 2', parent: 'deeper submenu'},
                        ]
                    }"
              >
              </ul>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavPill&quot;
    data-dojo-props=&quot;
      active: 'home',
      store: {
          idProperty: 'text',
          data: [
              {text: 'home'},
              {type: 'dropdown', text: 'help'},
              {text: 'action', parent: 'Help'},
              {text: 'another action', parent: 'help'},
              {text: 'something else here', parent: 'help'},
              {type: 'divider', parent: 'help'},
              {type: 'dropdown', text: 'deeper submenu', parent: 'help'},
              {text: 'Deep menu 1', parent: 'deeper submenu'},
              {text: 'Deep menu 2', parent: 'deeper submenu'},
          ]
      }&quot;
&gt;
&lt;/ul&gt;
</pre>

          <hr class="bs-docs-separator">


          <h2>Nav lists</h2>
          <p>A simple and easy way to build groups of nav links with optional headers. They're best used in sidebars like the Finder in OS X.</p>
          <p>Take a list of links and use <code>havok/widget/NavList</code>.</p>

          <h3>Markup nav list Example</h3>
          <p>If using markup, add <code>class="nav-header"</code> to create headers:</p>
          <div class="bs-docs-example">
            <div class="well" style="max-width: 340px; padding: 8px 0;">
              <ul data-dojo-type="havok/widget/NavList">
                <li class="nav-header">List header</li>
                <li class="active"><a href="">Home</a></li>
                <li><a href="">Library</a></li>
                <li><a href="">Applications</a></li>
                <li class="nav-header">Another list header</li>
                <li><a href="">Profile</a></li>
                <li><a href="">Settings</a></li>
                <hr />
                <li><a href="">Help</a></li>
              </ul>
            </div> <!-- /well -->
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavList&quot;&gt;
  &lt;li class=&quot;nav-header&quot;&gt;List header&lt;/li&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Library&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Applications&lt;/a&gt;&lt;/li&gt;
  &lt;li class=&quot;nav-header&quot;&gt;Another list header&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Settings&lt;/a&gt;&lt;/li&gt;
  &lt;hr /&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Help&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h3>Store nav list Example</h3>
          <p>If using a store, set <code>type: 'nav-header'</code> to create headers:</p>
          <div class="bs-docs-example">
            <div class="well" style="max-width: 340px; padding: 8px 0;">
              <ul data-dojo-type="havok/widget/NavList"
                  data-dojo-props="
                    activeId: 'Home',
                    store: {
                        idProperty: 'text',
                        data: [
                            {type: 'nav-header', text: 'List Header'},
                            {text: 'Home'},
                            {text: 'Library'},
                            {text: 'Applications'},
                            {type: 'nav-header', text: 'Another List Header'},
                            {text: 'Profile'},
                            {text: 'Settings'},
                            {type: 'divider', text: 'divider1'},
                            {text: 'Help'}
                        ]
                    }"
              >
              </ul>
            </div> <!-- /well -->
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavList&quot;
    data-dojo-props=&quot;
      activeId: 'Home',
      store: {
          idProperty: 'text',
          data: [
              {type: 'nav-header', text: 'List Header'},
              {text: 'Home'},
              {text: 'Library'},
              {text: 'Applications'},
              {type: 'nav-header', text: 'Another List Header'},
              {text: 'Profile'},
              {text: 'Settings'},
              {type: 'divider', text: 'divider1'},
              {text: 'Help'}
          ]
      }&quot;
&gt;
&lt;/ul&gt;
</pre>

        </section>