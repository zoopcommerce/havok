
        <section id="dropdownToggle" title="Dropdown Toggle">
          <div class="page-header">
            <h1>Dropdown Toggle</h1>
          </div>

          <p>Use <code>havok/widget/DropdownToggle</code> to make a <code>havok/widget/Dropdown</code> show and hide.</p>

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
                 <td>dropdown</td>
                 <td>object</td>
                 <td>undefined</td>
                 <td>Reference to the Dropdown widget which the DropdownToggle encloses.</td>
               </tr>
               <tr>
                 <td>placement</td>
                 <td>object</td>
                 <td><code>{toggle: 'bottom-left', dropdown: 'top-left'}</code></td>
                 <td>Defines where the dropdown will be placed when it is opened. The <code>toggle</code> defines the corner of the toggle button that will be used for placement. The <code>dropdown</code> defines the corner of the dropdown that will be used for placement. By default the top-left corner of the dropdown is aligned with the bottom-left corner of the toggle. Note that placement will be automatically adjusted if the dropdown will be clipped by and edge of the viewport.</td>
               </tr>
                <tr>
                    <td>templateString</td>
                    <td>string</td>
                    <td>content of <code>havok/widget/template/DropdownToggle.html<code></td>
                    <td>The base template for a DropdownToggle.</td>
                </tr>
              </tbody>
            </table>

          <h2>Methods</h2>

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
        <td>Shows the enclosed Dropdown</td>
    </tr>
    <tr>
        <td>.hide()</td>
        <td>-</td>
        <td>Hides the enclosed Dropdown.</td>
    </tr>
    <tr>
        <td>.toggle()</td>
        <td>-</td>
        <td>Toggles the enclosed Dropdown.</td>
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

          <h2>Examples</h2>

          <h3>Within a navbar</h3>
          <div class="bs-docs-example">
            <div id="navbar-example" class="navbar navbar-static">
              <div class="navbar-inner">
                <div class="container" style="width: auto;">
                  <a class="brand" href="">Project Name</a>
                  <ul class="nav" role="navigation">
                    <li data-dojo-type="havok/widget/DropdownToggle">
                      <a href="">Dropdown <b class="caret"></b></a>
                      <ul data-dojo-type="havok/widget/Dropdown" aria-labelledby="drop1">
                        <li><a href="http://google.com">Action</a></li>
                        <li><a href="anotherAction">Another action</a></li>
                        <li><a href="">Something else here</a></li>
                        <hr />
                        <li><a href="">Separated link</a></li>
                      </ul>
                    </li>
                    <li data-dojo-type="havok/widget/DropdownToggle">
                      <a href="">Dropdown Container<b class="caret"></b></a>
                      <div data-dojo-type="havok/widget/DropdownContainer" aria-labelledby="drop2">
                        <div>
                          <h5>Stuff here</h5>
                          <p>This is stuff inside a dropdown</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul class="nav pull-right">
                    <li data-dojo-type="havok/widget/DropdownToggle">
                      <a href="" >Dropdown Right <b class="caret"></b></a>
                      <ul data-dojo-type="havok/widget/Dropdown" aria-labelledby="drop3">
                        <li><a href="">Action</a></li>
                        <li><a href="">Another action</a></li>
                        <li><a href="">Something else here</a></li>
                        <hr />
                        <li><a href="">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;li data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
  &lt;a href=&quot;&quot;&gt;Dropdown &lt;b class=&quot;caret&quot;&gt;&lt;/b&gt;&lt;/a&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot; aria-labelledby=&quot;drop1&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;http://google.com&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;anotherAction&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;hr /&gt;
    &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;
...
</pre>

          <h3>Within pills</h3>
          <div class="bs-docs-example">
            <ul class="nav nav-pills">
              <li class="active"><a href="">Regular link</a></li>
              <li data-dojo-type="havok/widget/DropdownToggle">
                <a href="">Dropdown <b class="caret"></b></a>
                <ul data-dojo-type="havok/widget/Dropdown" aria-labelledby="drop4">
                    <li><a href="">Action</a></li>
                    <li><a href="">Another action</a></li>
                    <li><a href="">Something else here</a></li>
                    <hr />
                    <li><a href="">Separated link</a></li>
                </ul>
              </li>
              <li data-dojo-type="havok/widget/DropdownToggle">
                <a href="">Dropdown 2 <b class="caret"></b></a>
                <ul data-dojo-type="havok/widget/Dropdown" aria-labelledby="drop5">
                    <li><a href="">Action</a></li>
                    <li><a href="">Another action</a></li>
                    <li><a href="">Something else here</a></li>
                    <hr />
                    <li><a href="">Separated link</a></li>
                </ul>
              </li>
              <li data-dojo-type="havok/widget/DropdownToggle">
                <a href="">Dropdown 3 <b class="caret"></b></a>
                <ul data-dojo-type="havok/widget/Dropdown" aria-labelledby="drop5">
                    <li><a href="">Action</a></li>
                    <li><a href="">Another action</a></li>
                    <li><a href="">Something else here</a></li>
                    <hr />
                    <li><a href="">Separated link</a></li>
                </ul>
              </li>
            </ul> <!-- /tabs -->
          </div>

          <h3>Within overflow hidden element</h3>
          <p>The Dropdown dom nodes is moved to the end of the document, removing any clipping problems, or display issues with dropdowns in modals.</p>
          <div class="bs-docs-example">
              <div style="width: 100px; overflow: hidden">
                    <div style="width:300px" data-dojo-type="havok/widget/DropdownToggle">
                      <button class="btn">Dropdown <b class="caret"></b></button>
                      <ul data-dojo-type="havok/widget/Dropdown">
                          <li><a href="">Action</a></li>
                          <li><a href="">Another action</a></li>
                          <li><a href="">Something else here</a></li>
                          <hr />
                          <li><a href="">Separated link</a></li>
                      </ul>
                    </div>
                  <p style="width:300px">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.</p>
              </div>
          </div>

          <hr class="bs-docs-separator">


          <h2>Usage</h2>

          <h3>Declarative</h3>
          <p>The first child element inside a <code>havok/widget/DropdownToggle</code> is the `button` which will toggle the dropdown. The first <code>havok/widget/Dropdown</code> child widget inside a <code>havok/widget/DropdownToggle</code> will be toggled.</p>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
  &lt;button&gt;Show dropdown&lt;/button&gt; &lt;!--this node will show/hide the dropdown--&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot; data-dojo-props=&quot;store: mystore&quot;&gt; &lt;!--this is the dropdown which will be shown/hidden--&gt;
  &lt;/ul&gt;
&lt;/div&gt;
</pre>
          <h3>Programatic</h3>

          <p>To create a <code>havok/widget/DropdownToggle</code> programatically, pass an instance of <code>havok/widget/Dropdown</code> to the <code>dropdown</code> property, and the markup to create the button to the <code>innerHTML</code> property.</p>
          <div class="bs-docs-example">
            <div id="dropdownButton1">
                <script type="text/javascript">
                    require([
                        'dojo/dom',
                        'havok/widget/Dropdown',
                        'havok/widget/DropdownToggle',
                        'dojo/domReady!'
                    ],
                    function(
                        dom,
                        Dropdown,
                        DropdownToggle
                    ){
                        var dropdownToggle = new DropdownToggle({
                            innerHTML: '<button class="btn">Click me</button>',
                            dropdown:  new Dropdown({store: {
                                data: [
                                    {id: 0, text: 'Action'},
                                    {id: 1, text: 'Another Action'},
                                    {id: 2, text: 'Something else here'},
                                    {id: 3, type: 'divider'},
                                    {id: 4, text: 'Separated Link'}
                                ]
                            }})
                        });

                        dom.byId('dropdownButton1').appendChild(dropdownToggle.domNode);

                        dropdownToggle.startup();
                    })
                </script>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div id=&quot;dropdownButton1&quot;&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        require([
            'dojo/dom',
            'havok/widget/Dropdown',
            'havok/widget/DropdownToggle',
            'dojo/domReady!'
        ],
        function(
            dom,
            Dropdown,
            DropdownToggle
        ){
            var dropdownToggle = new DropdownToggle({
                innerHTML: '&lt;button class=&quot;btn&quot;&gt;Click me&lt;/button&gt;',
                dropdown:  new Dropdown({store: {
                    data: [
                        {id: 0, text: 'Action'},
                        {id: 1, text: 'Another Action'},
                        {id: 2, text: 'Something else here'},
                        {id: 3, type: 'divider'},
                        {id: 4, text: 'Separated Link'}
                    ]
                }})
            });

            dom.byId('dropdownButton1').appendChild(dropdownToggle.domNode);

            dropdownToggle.startup();
        })
    &lt;/script&gt;
&lt;/div&gt;
</pre>

          <h3>Fine grained control</h3>

          <p>Use attach points to control exactly which element in the markup will respond to a click.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/DropdownToggle" class="well">
              <p>Extra text</p>
              <button data-dojo-attach-point="button" class="btn">Show Dropdown</button>
              <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a href="">Action</a></li>
                  <li><a href="">Another action</a></li>
                  <li><a href="">Something else here</a></li>
                  <hr />
                  <li><a href="">Separated link</a></li>
              </ul>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/DropdownToggle&quot; class=&quot;well&quot;&gt;
  &lt;p&gt;Extra text&lt;/p&gt;
  &lt;button data-dojo-attach-point=&quot;button&quot; class=&quot;btn&quot;&gt;Show Dropdown&lt;/button&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      ...
  &lt;/ul&gt;
&lt;/div&gt;
</pre>

        </section>