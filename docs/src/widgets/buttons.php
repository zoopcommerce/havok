        <section id="buttons" title="Buttons">
          <div class="page-header">
            <h1>Buttons</h1>
          </div>

            <h2>Keyboard handling buttons</h2>
            <p>Use <code>havok/widget/Button</code> to add a button that can also respond to keypress events. The button widget can be used in place of any <code>button</code> tag.</p>

            <p>Note: be careful, the keypress listeners on buttons may override normal browser controls. The <code>keyTarget</code> property controls the node that keypress events are listened to. By default it is set to 'window'. To turn off keyboard event listening, set <code>keyTarget</code> to false.</p>

          <div class="bs-docs-example">
              <div id="keyButtons">
            <button data-dojo-type="havok/widget/Button" data-dojo-props="keys: 'm'">press 'm'</button>
            <button data-dojo-type="havok/widget/Button" data-dojo-props="keys: {ctrl: true, char: 'm'}">press 'ctrl m'</button>
            <button data-dojo-type="havok/widget/Button" data-dojo-props="keys: {ctrl: true, shift: true, char: 'm'}">press 'ctrl shift m'</button>
            <button data-dojo-type="havok/widget/Button" data-dojo-props="keys: {ctrl: true, shift: true, alt: true, char: 'm'}">press 'ctrl shift alt m'</button>
              </div>
            <div class="well well-small">
                <p>you clicked:</p>
                <pre id="keyResult"></pre>
            </div>
            <script>
                require(['dojo/dom', 'dojo/query', 'havok/parseComplete!'], function(dom, query){
                    var result = function(e){
                        e.preventDefault();
                        dom.byId('keyResult').innerHTML = e.target.innerHTML;
                    };
                    query('[widgetid]', dom.byId('keyButtons')).on('click', result);
                })
            </script>
          </div>
<pre class="prettyprint linenums">
&lt;button data-dojo-type=&quot;havok/widget/Button&quot; data-dojo-props=&quot;keys: 'm'&quot;&gt;press 'm'&lt;/button&gt;
&lt;button data-dojo-type=&quot;havok/widget/Button&quot; data-dojo-props=&quot;keys: {ctrl: true, char: 'm'}&quot;&gt;press 'ctrl m'&lt;/button&gt;
&lt;button data-dojo-type=&quot;havok/widget/Button&quot; data-dojo-props=&quot;keys: {ctrl: true, shift: true, char: 'm'}&quot;&gt;press 'ctrl shift m'&lt;/button&gt;
&lt;button data-dojo-type=&quot;havok/widget/Button&quot; data-dojo-props=&quot;keys: {ctrl: true, shift: true, alt: true, char: 'm'}&quot;&gt;press 'ctrl shift alt m'&lt;/button&gt;
</pre>

            <h2>Button Groups</h2>
          <p>Wrap a series of buttons with <code>havok/widget/ButtonGroup</code> to create a group.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/ButtonGroup">
              <button>Left</button>
              <button>Middle</button>
              <button>Right</button>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/ButtonGroup&quot; &gt;
  &lt;button&gt;Left&lt;/button&gt;
  &lt;button&gt;Middle&lt;/button&gt;
  &lt;button&gt;Right&lt;/button&gt;
&lt;/div&gt;
</pre>

          <h3>Vertical button groups</h3>
          <p>Make a set of buttons appear vertically stacked rather than horizontally.</p>
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/ButtonGroup" class="btn-group-vertical">
              <button><i class="icon-align-left"></i></button>
              <button><i class="icon-align-center"></i></button>
              <button><i class="icon-align-right"></i></button>
              <button><i class="icon-align-justify"></i></button>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/ButtonGroup&quot; class=&quot;btn-group-vertical&quot;&gt;
    ...
&lt;/div&gt;
</pre>

  <h4>Properties</h4>

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
        <td>templateString</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/ButtonGroup.html<code></td>
        <td>The base template for a ButtonGroup.</td>
    </tr>
    <tr>
        <td>active</td>
        <td>object</td>
        <td></td>
        <td>Array of active buttons.</td>
    </tr>
  </tbody>
</table>

  <h4>Events</h4>

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


            <h3>Single toggle</h3>
            <p>Use <code>havok/widget/ToggleButton</code> to create a single toggle button.</p>
            <div class="bs-docs-example" style="padding-bottom: 24px;">
              <button data-dojo-type="havok/widget/ToggleButton" class="btn-primary">Single Toggle</button>
            </div>
<pre class="prettyprint linenums">
&lt;button data-dojo-type=&quot;havok/widget/ToggleButton&quot; class=&quot;btn-primary&quot;&gt;Single Toggle&lt;/button&gt;
</pre>

  <h4>Properties</h4>

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
        <td>templateString</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/Button.html<code></td>
        <td>The base template for a Button.</td>
    </tr>
    <tr>
        <td>active</td>
        <td>boolean</td>
        <td>false</td>
        <td>If the button is toggled.</td>
    </tr>
  </tbody>
</table>

  <h4>Methods</h4>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">name</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
        <td>toggle()</td>
        <td>Toggles the button.</td>
    </tr>
  </tbody>
</table>

  <h4>Events</h4>

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

            <h3>Checkbox</h3>
            <p>Use <code>havok/widget/CheckboxGroup</code> for checkbox style toggling on btn-group.</p>
            <div class="bs-docs-example" style="padding-bottom: 24px;">
              <div data-dojo-type="havok/widget/CheckboxGroup">
                <button class="btn-primary">Left</button>
                <button class="btn-primary">Middle</button>
                <button class="btn-primary">Right</button>
              </div>
            </div>
<pre class="prettyprint linenums">
&lt;div class="havok/widget/CheckboxGroup"&gt;
  &lt;button type="button" class="btn-primary"&gt;Left&lt;/button&gt;
  &lt;button type="button" class="btn-primary"&gt;Middle&lt;/button&gt;
  &lt;button type="button" class="btn-primary"&gt;Right&lt;/button&gt;
&lt;/div&gt;
</pre>

  <h4>Properties</h4>

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
        <td>templateString</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/ButtonGroup.html<code></td>
        <td>The base template for a ButtonGroup.</td>
    </tr>
    <tr>
        <td>active</td>
        <td>object</td>
        <td></td>
        <td>Array of active buttons.</td>
    </tr>
  </tbody>
</table>

  <h4>Events</h4>

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

            <h3>Radio</h3>
            <p>Add <code>data-toggle="buttons-radio"</code> for radio style toggling on btn-group.</p>
            <div class="bs-docs-example" style="padding-bottom: 24px;">
              <div data-dojo-type="havok/widget/RadioGroup">
                <button type="button" class="btn-primary">Left</button>
                <button type="button" class="btn-primary">Middle</button>
                <button type="button" class="btn-primary">Right</button>
              </div>
            </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type="havok/widget/RadioGroup"&gt;
  &lt;button type="button" class="btn-primary"&gt;Left&lt;/button&gt;
  &lt;button type="button" class="btn-primary"&gt;Middle&lt;/button&gt;
  &lt;button type="button" class="btn-primary"&gt;Right&lt;/button&gt;
&lt;/div&gt;
</pre>

  <h4>Properties</h4>

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
        <td>templateString</td>
        <td>string</td>
        <td>content of <code>havok/widget/template/ButtonGroup.html<code></td>
        <td>The base template for a ButtonGroup.</td>
    </tr>
    <tr>
        <td>active</td>
        <td>object</td>
        <td></td>
        <td>The active button.</td>
    </tr>
  </tbody>
</table>

  <h4>Events</h4>

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

  <h2>Button Dropdowns</h2>

            <h2>Overview and examples</h2>
          <p><code>havok/widget/DropdownToggle</code> with a <code>btn-group</code> class can be used to create button dropdown menus.</p>
          <div class="bs-docs-example">
              <button class="btn" data-dojo-type="havok/widget/DropdownToggle">
                Action <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-primary" data-dojo-type="havok/widget/DropdownToggle">
                Action <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-danger" data-dojo-type="havok/widget/DropdownToggle">
                Danger <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-warning" data-dojo-type="havok/widget/DropdownToggle">
                Warning <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-success" data-dojo-type="havok/widget/DropdownToggle">
                Success <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-info" data-dojo-type="havok/widget/DropdownToggle">
                Info <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-inverse" data-dojo-type="havok/widget/DropdownToggle">
                Inverse <span class="caret"></span>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
          </div>
<pre class="prettyprint linenums">
&lt;button class=&quot;btn&quot; data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
  Action &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
  &lt;ul class=&quot;hidden&quot; data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
    &lt;li&gt;&lt;a&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;hr /&gt;
    &lt;li&gt;&lt;a&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/button&gt;
</pre>

          <h3>Works with all button sizes</h3>
          <p>Button dropdowns work at any size:  <code>.btn-large</code>, <code>.btn-small</code>, or <code>.btn-mini</code>.</p>
          <div class="bs-docs-example">
              <button class="btn btn-large" data-dojo-type="havok/widget/DropdownToggle">
                Large button <span class="caret"></span>
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-small" data-dojo-type="havok/widget/DropdownToggle">
                Small button <span class="caret"></span>
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
              <button class="btn btn-mini" data-dojo-type="havok/widget/DropdownToggle">
                Mini button <span class="caret"></span>
                <ul data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </button>
          </div>

          <hr class="bs-docs-separator">

          <h2>Split button dropdowns</h2>
          <p>Building on the button group styles and markup, we can easily create a split button. Split buttons feature a standard action on the left and a dropdown toggle on the right with contextual links.</p>
          <div class="bs-docs-example">
              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn">Action</button>
                <button data-dojo-attach-point="button" class="btn"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-primary">Action</button>
                <button data-dojo-attach-point="button" class="btn btn-primary"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-danger">Danger</button>
                <button data-dojo-attach-point="button" class="btn btn-danger"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-warning">Warning</button>
                <button data-dojo-attach-point="button" class="btn btn-warning"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-success">Success</button>
                <button data-dojo-attach-point="button" class="btn btn-success"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-info">Info</button>
                <button data-dojo-attach-point="button" class="btn btn-info"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-inverse">Inverse</button>
                <button data-dojo-attach-point="button" class="btn btn-inverse"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>
          </div>
<pre class="prettyprint linenums">
&lt;div class=&quot;btn-group&quot; data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
  &lt;button class=&quot;btn&quot;&gt;Inverse&lt;/button&gt;
  &lt;button data-dojo-attach-point=&quot;button&quot; class=&quot;btn btn-inverse&quot;&gt;&lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      ...
  &lt;/ul&gt;
&lt;/div&gt;
</pre>

          <h3>Sizes</h3>
          <p>Utilize the extra button classes <code>.btn-mini</code>, <code>.btn-small</code>, or <code>.btn-large</code> for sizing.</p>
          <div class="bs-docs-example">
            <div class="btn-toolbar">

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-large">Large action</button>
                <button data-dojo-attach-point="button" class="btn btn-large"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-small">Small action</button>
                <button data-dojo-attach-point="button" class="btn btn-small"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>

              <div class="btn-group" data-dojo-type="havok/widget/DropdownToggle">
                <button class="btn btn-mini">Mini action</button>
                <button data-dojo-attach-point="button" class="btn btn-mini"><span class="caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>Dropup menus</h3>

          <div class="bs-docs-example">
            <div class="btn-toolbar" style="margin: 0;">

              <div class="btn-group dropup"
                   data-dojo-type="havok/widget/DropdownToggle"
                   data-dojo-props="placement: {placementNode: 'top-left', dropdown: 'bottom-left'}"
              >
                <button class="btn">Dropup</button>
                <button data-dojo-attach-point="button" class="btn"><span class="dropup caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div class=&quot;btn-group dropup&quot;
     data-dojo-type=&quot;havok/widget/DropdownToggle&quot;
     data-dojo-props=&quot;placement: {placementNode: 'top-left', dropdown: 'bottom-left'}&quot;
&gt;
  &lt;button class=&quot;btn&quot;&gt;Dropup&lt;/button&gt;
  &lt;button data-dojo-attach-point=&quot;button&quot; class=&quot;btn&quot;&gt;&lt;span class=&quot;dropup caret&quot;&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      ...

  &lt;/ul&gt;
&lt;/div&gt;
</pre>

          <h3>Right Dropup</h3>

          <div class="bs-docs-example">
            <div class="btn-toolbar" style="margin: 0;">
              <div class="btn-group dropup"
                   data-dojo-type="havok/widget/DropdownToggle"
                   data-dojo-props="placement: {placementNode: 'top-right', dropdown: 'bottom-right'}"
              >
                <button class="btn">Right Dropup</button>
                <button data-dojo-attach-point="button" class="btn"><span class="dropup caret"></span></button>
                <ul class="hidden" data-dojo-type="havok/widget/Dropdown">
                  <li><a>Action</a></li>
                  <li><a>Another action</a></li>
                  <li><a>Something else here</a></li>
                  <hr />
                  <li><a>Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div class=&quot;btn-group dropup&quot;
     data-dojo-type=&quot;havok/widget/DropdownToggle&quot;
     data-dojo-props=&quot;placement: {placementNode: 'top-right', dropdown: 'bottom-right'}&quot;
&gt;
  &lt;button class=&quot;btn&quot;&gt;Right Dropup&lt;/button&gt;
  &lt;button data-dojo-attach-point=&quot;button&quot; class=&quot;btn&quot;&gt;&lt;span class=&quot;dropup caret&quot;&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
      ...
  &lt;/ul&gt;
&lt;/div&gt;
</pre>

        </section>
