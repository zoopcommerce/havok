        <!-- Nav, Tabs, & Pills
        ================================================== -->
        <section id="navs" title="Navs">
          <div class="page-header">
            <h1>Nav: tabs, pills, and lists</h1>
          </div>

          <h2>Basic tabs</h2>
          <p>Use the <code>nav-tab</code> tag to create an instance of <code>havok/widget/NavTab</code>:</p>
          <div class="bs-docs-example">
            <nav-tab>
              <a class="active" href="">Home</a>
              <a href="">Profile</a>
              <a href="">Messages</a>
            </nav-tab>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Basic pills</h3>
          <p>Use the <code>nav-pill</code> tag to create an instance of <code>havok/widget/NavPill</code>:</p>
          <div class="bs-docs-example">
            <nav-pill>
              <a class="active" href="">Home</a>
              <a href="">Profile</a>
              <a href="">Messages</a>
            </nav-pill>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Click events</h3>
          <p>If the <code>href</code> attribute is an empty string, the active nav item will be changed. If the <code>href</code> attribute is not empty, the link will be followed. Eg:</p>
          <div class="bs-docs-example">
            <nav-tab>
              <a class="active" href="">Home</a>
              <a href="">tab 1</a>
              <a href="">tab 2</a>
              <a href="#navs">#navs anchor</a>
              <a href="http://github.com">github.com</a>
            </nav-tab>
          </div>
<pre class="prettyprint linenums">

</pre>

          <p>To listen to click events, use the <code>.on('item-click', callback)</code> method. Eg:
          <div class="bs-docs-example">
            <nav-tab id="navTabs1">
              <a class="active" href="">tab 0</a>
              <a href="">tab 1</a>
              <a href="">tab 2</a>
            </nav-tab>
            <script type="text/javascript">
                require(['dijit/registry', 'havok/parser/complete!'], function(registry){
                    registry.byId('navTabs1').on('item-click', function(item){
                        alert('Just clicked item: ' + item.innerHTML)
                    })
                })
            </script>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h4>Watching active item</h4>
          <p>To watch the active item in code, use the <code>.watch('active', callback)</code> method. Note, this is different to <code>.on('item-click', callback)</code>, as it will only fire when the active item is changed, not on every click. Eg:
          <div class="bs-docs-example">
            <nav-tab id="navTabs2">
              <a class="active" href="">tab 0</a>
              <a href="">tab 1</a>
              <a href="">tab 2</a>
            </nav-tab>
            <script type="text/javascript">
                require(['dijit/registry', 'havok/parser/complete!'], function(registry){
                    registry.byId('navTabs2').watch('active', function(property, oldValue, newValue){
                        alert('Previously active tab: ' + oldValue.innerHTML + '. Currently active tab: ' + newValue.innerHTML)
                    })
                })
            </script>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Component alignment</h3>
          <p>To align nav links, use the <code>.pull-left</code> or <code>.pull-right</code> utility classes. Both classes will add a CSS float in the specified direction.</p>

          <h3>Programatic example</h3>
          <div class="bs-docs-example">
            <div id="nav1"></div>
            <script type="text/javascript">
                require(['dojo/dom', 'havok/widget/NavPill', 'dojo/domReady!'], function(dom, NavPill){
                    var nav = new NavPill;
                    nav.addItem('<a class="active" href="">Home</a>');
                    nav.addItem('<a href="">Profile</a>');
                    nav.addItem('<a href="">Messages</a>');
                    dom.byId('nav1').appendChild(nav.domNode);
                    nav.startup();
                })
            </script>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Disabled state</h3>
          <p>For any nav component (tabs, pills, or list), add <code>.disabled</code> to the item for <strong>gray links and no hover effects</strong>. Links will not be clickable.</p>
          <div class="bs-docs-example">
            <nav-pill>
              <a href="">Clickable link</a>
              <a href="">Clickable link</a>
              <a class="disabled" href="">Disabled link</a>
            </nav-pill>
          </div>
<pre class="prettyprint linenums">

</pre>

          <hr class="bs-docs-separator">

          <h2>Data Store</h2>
          <p>The <code>havok/widget/_StoreMixin</code> can be used with navs.<p>

          <hr class="bs-docs-separator">

          <h2>Stackable</h2>
          <p>As tabs and pills are horizontal by default, just add a class, <code>.nav-stacked</code>, to make them appear vertically stacked.</p>

          <h3>Stacked tabs</h3>
          <div class="bs-docs-example">
            <nav-tab class="nav-stacked">
              <a class="active" href="">Home</a>
              <a href="">Profile</a>
              <a href="">Messages</a>
            </nav-tab>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Stacked pills</h3>
          <div class="bs-docs-example">
            <nav-pill class="nav-stacked">
              <a class="active" href="">Home</a>
              <a href="">Profile</a>
              <a href="">Messages</a>
            </nav-pill>
          </div>
<pre class="prettyprint linenums">

</pre>


          <hr class="bs-docs-separator">

          <h2>Dropdowns</h2>
          <p>Add dropdown menus with the <code>dropdown-toggle</code> tag.</p>

          <h3>Tabs with dropdowns</h3>
          <div class="bs-docs-example">
            <nav-tab>
              <a class="active" href="">Home</a>
              <a href="">Help</a>
              <dropdown-toggle>
                <a href="">Dropdown <b class="caret"></b></a>
                <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <a href="">Separated link</a>
                </dropdown>
              </dropdown-toggle>
            </nav-tab>
          </div>
<pre class="prettyprint linenums">

</pre>

          <h3>Pills with dropdowns</h3>
          <div class="bs-docs-example">
           <nav-pill>
              <a class="active" href="">Home</a>
              <a href="">Help</a>
              <dropdown-toggle>
                <a href="">Dropdown <b class="caret"></b></a>
                <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <a href="">Separated link</a>
                </dropdown>
              </dropdown-toggle>
            </nav-pill>
          </div>
<pre class="prettyprint linenums">

</pre>

          <hr class="bs-docs-separator">

          <h2>Nav lists</h2>
          <p>A simple and easy way to build groups of nav links with optional headers. They're best used in sidebars like the Finder in OS X.</p>
          <p>Take a list of links and use <code>havok/widget/NavList</code>.</p>

          <h3>Markup nav list Example</h3>
          <p>If using markup, add <code>class="nav-header"</code> to create headers:</p>
          <div class="bs-docs-example">
            <div class="well" style="max-width: 340px; padding: 8px 0;">
              <nav-list>
                <li class="nav-header">List header</li>
                <a class="active" href="">Home</a>
                <a href="">Library</a>
                <a href="">Applications</a>
                <li class="nav-header">Another list header</li>
                <a href="">Profile</a>
                <a href="">Settings</a>
                <hr />
                <a href="">Help</a>
              </nav-list>
            </div>
          </div>
<pre class="prettyprint linenums">

</pre>

        </section>