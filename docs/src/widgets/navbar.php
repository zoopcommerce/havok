<section id="navbar" title="Navbar">
  <div class="page-header">
    <h1>Navbar</h1>
  </div>

<h2>Basic navbar</h2>
<p>To start, navbars are static (not fixed to the top) and include support for a project name and basic navigation. Place one anywhere within a <code>.container</code>, which sets the width of your site and content.</p>

<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <a class="brand">Title</a>
      <ul data-dojo-type="havok/widget/NavBarLinks">
        <li class="active"><a>Home</a></li>
        <li><a>Link</a></li>
        <li><a>Link</a></li>
      </ul>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/NavBar&quot;&gt;
    &lt;a class=&quot;brand&quot;&gt;Title&lt;/a&gt;
    &lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;&gt;
      &lt;li class=&quot;active&quot;&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a&gt;Link&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a&gt;Link&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
</pre>

<hr class="bs-docs-separator">

<h2>Navbar components</h2>

<h3>Brand</h3>
<p>A simple link to show your brand or project name only requires an anchor tag.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
    <a class="brand" href="#">Title</a>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;a class="brand" href="#"&gt;Project name&lt;/a&gt;
</pre>

<h3>Nav links</h3>
<p>Nav items are simple to add via <code>havok/widget/NavBarLinks</code> widget.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <ul data-dojo-type="havok/widget/NavBarLinks">
        <li class="active"><a>Home</a></li>
        <li><a>Link</a></li>
        <li><a>Link</a></li>
      </ul>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;&gt;
  &lt;li class=&quot;active&quot;&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a&gt;Link&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a&gt;Link&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

<p>You can easily add dividers to your nav links with an empty list item and a simple class. Just use the <code>hr</code> tag.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <ul data-dojo-type="havok/widget/NavBarLinks">
        <li class="active"><a>Home</a></li>
        <hr />
        <li><a>Link</a></li>
        <hr />
        <li><a>Link</a></li>
      </ul>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;ul class="nav"&gt;
    ...
    &lt;hr /&gt;
    ...
&lt;/ul&gt;
</pre>

<h3>Forms</h3>
<p>To properly style and position a form within the navbar, add the appropriate classes as shown below. For a default form, include <code>.navbar-form</code> and either <code>.pull-left</code> or <code>.pull-right</code> to properly align it.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <form class="navbar-form pull-left">
        <input type="text" class="span2">
        <button type="submit" class="btn">Submit</button>
      </form>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;form class="navbar-form pull-left"&gt;
    &lt;input type="text" class="span2"&gt;
    &lt;button type="submit" class="btn"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
</pre>

<h3>Search form</h3>
<p>For a more customized search form, add <code>.navbar-search</code> to the <code>form</code> and <code>.search-query</code> to the input for specialized styles in the navbar.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <form class="navbar-search pull-left">
        <input type="text" class="search-query" placeholder="Search">
      </form>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;form class="navbar-search pull-left"&gt;
    &lt;input type="text" class="search-query" placeholder="Search"&gt;
&lt;/form&gt;
</pre>

<h3>Component alignment</h3>
<p>Align nav links, search form, or text, use the <code>.pull-left</code> or <code>.pull-right</code> utility classes. Both classes will add a CSS float in the specified direction.</p>

<h3>Using dropdowns</h3>
<p>Use <code>havok/widget/DropdownToggle</code> and <code>havok/widget/Dropdown</code> inside a links list.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <ul data-dojo-type="havok/widget/NavBarLinks">
        <li class="active"><a>Home</a></li>
        <li data-dojo-type="havok/widget/DropdownToggle">
            <a>Dropdown</a>
            <ul data-dojo-type="havok/widget/Dropdown">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </li>
      </ul>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/NavBar&quot;&gt;
    &lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;&gt;
      &lt;li class=&quot;active&quot;&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li data-dojo-type=&quot;havok/widget/DropdownToggle&quot;&gt;
          &lt;a&gt;Dropdown&lt;/a&gt;
          &lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;&gt;
              &lt;li&gt;&lt;a&gt;Item 1&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a&gt;Item 2&lt;/a&gt;&lt;/li&gt;
          &lt;/ul&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
</pre>

<p>Dropdown example using a store.</p>
<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <ul data-dojo-type="havok/widget/NavBarLinks"
          data-dojo-props="store: {
            idProperty: 'text',
            data: [
                {text: 'Home'},
                {type: 'dropdown', text: 'Dropdown'},
                {text: 'Item 1', parent: 'Dropdown'},
                {text: 'Item 2', parent: 'Dropdown'},
            ]
          }"
      >
      </ul>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/NavBar&quot;&gt;
    &lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;
        data-dojo-props=&quot;store: {
          idProperty: 'text',
          data: [
              {text: 'Home'},
              {type: 'dropdown', text: 'Dropdown'},
              {text: 'Item 1', parent: 'Dropdown'},
              {text: 'Item 2', parent: 'Dropdown'},
          ]
        }&quot;
    &gt;
    &lt;/ul&gt;
&lt;/div&gt;
</pre>

<h3>Text</h3>
<p>Wrap strings of text in an element with <code>.navbar-text</code>, usually on a <code>&lt;p&gt;</code> tag for proper leading and color.</p>


<hr class="bs-docs-separator">


<h2>Optional display variations</h2>
<p>Fix the navbar to the top or bottom of the viewport with an additional class on the outermost div, <code>.navbar</code>.</p>

<h3>Fixed to top</h3>
<p>Add <code>.navbar-fixed-top</code> and remember to account for the hidden area underneath it by adding at least 40px <code>padding</code> to the <code>&lt;body&gt;</code>. Be sure to add this after the core Bootstrap CSS and before the optional responsive CSS.</p>
<div class="bs-docs-example bs-navbar-top-example">
  <div data-dojo-type="havok/widget/NavBar" class="navbar-fixed-top" style="position: absolute;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="">Title</a>
        <ul class="nav">
          <li class="active"><a href="">Home</a></li>
          <li><a href="">Link</a></li>
          <li><a href="">Link</a></li>
        </ul>
      </div>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type="havok/widget/NavBar" class="navbar-fixed-top"&gt;
...
&lt;/div&gt;
</pre>

<h3>Fixed to bottom</h3>
<p>Add <code>.navbar-fixed-bottom</code> instead.</p>
<div class="bs-docs-example bs-navbar-bottom-example">
  <div data-dojo-type="havok/widget/NavBar" class="navbar-fixed-bottom" style="position: absolute;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="#">Title</a>
        <ul class="nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
    </div>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type="havok/widget/NavBar" class="navbar-fixed-bottom"&gt;
...
&lt;/div&gt;
</pre>

<h3>Static top navbar</h3>
<p>Create a full-width navbar that scrolls away with the page by adding <code>.navbar-static-top</code>. Unlike the <code>.navbar-fixed-top</code> class, you do not need to change any padding on the <code>body</code>.</p>
<div class="bs-docs-example bs-navbar-top-example">
  <div data-dojo-type="havok/widget/NavBar" class="navbar-static-top" style="margin: -1px -1px 0;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="#">Title</a>
        <ul class="nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
      </div>
  </div>
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type="havok/widget/NavBar" class="navbar-static-top"&gt;
...
&lt;/div&gt;
</pre>


<hr class="bs-docs-separator">


<h2>Responsive navbar</h2>
<p>To implement a collapsing responsive navbar, wrap your navbar content in a containing div, and use <code>data-dojo-attach-point="toggleNode"</code> with <code>data-dojo-attach-point="toggleTarget"</code></p>

<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar">
      <div class="container">
        <a data-dojo-attach-point="toggleNode">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a class="brand" href="#">Title</a>
        <div data-dojo-attach-point="toggleTarget">
          <ul data-dojo-type="havok/widget/NavBarLinks"
              data-dojo-props="
                active: 'Home',
                store: {
                    idProperty: 'text',
                    data: [
                        {text: 'Home'},
                        {text: 'Link 1'},
                        {text: 'Link 2'},
                        {type: 'dropdown', text: 'Dropdown'},
                        {text: 'Action', parent: 'Dropdown'},
                        {text: 'Another action', parent: 'Dropdown'},
                        {text: 'Something else here', parent: 'Dropdown'},
                        {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                        {type: 'nav-header', text: 'Nav header', parent: 'Dropdown'},
                        {text: 'Separated link', parent: 'Dropdown'},
                        {text: 'One more separated link', parent: 'Dropdown'}
                    ]
                }
              "
          ></ul>
          <form class="navbar-search pull-left" action="">
            <input type="text" class="search-query span2" placeholder="Search">
          </form>
          <ul class="pull-right"
              data-dojo-type="havok/widget/NavBarLinks"
              data-dojo-props="
                active: 'Home',
                store: {
                    idProperty: 'text',
                    data: [
                        {text: 'Link'},
                        {type: 'divider', text: 'divider1'},
                        {type: 'dropdown', text: 'Dropdown'},
                        {text: 'Action', parent: 'Dropdown'},
                        {text: 'Another action', parent: 'Dropdown'},
                        {text: 'Something else here', parent: 'Dropdown'},
                        {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                        {text: 'Separated link', parent: 'Dropdown'}
                    ]
                }
              "
          ></ul>
        </div><!-- /.nav-collapse -->
      </div>
  </div><!-- /navbar -->
</div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/NavBar&quot;&gt;
    &lt;div class=&quot;container&quot;&gt;
      &lt;a data-dojo-attach-point=&quot;toggleNode&quot;&gt;
        &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
      &lt;/a&gt;
      &lt;a class=&quot;brand&quot; href=&quot;#&quot;&gt;Title&lt;/a&gt;
      &lt;div data-dojo-attach-point=&quot;toggleTarget&quot;&gt;
        &lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;
            data-dojo-props=&quot;
              active: 'Home',
              store: {
                  idProperty: 'text',
                  data: [
                      {text: 'Home'},
                      {text: 'Link 1'},
                      {text: 'Link 2'},
                      {type: 'dropdown', text: 'Dropdown'},
                      {text: 'Action', parent: 'Dropdown'},
                      {text: 'Another action', parent: 'Dropdown'},
                      {text: 'Something else here', parent: 'Dropdown'},
                      {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                      {type: 'nav-header', text: 'Nav header', parent: 'Dropdown'},
                      {text: 'Separated link', parent: 'Dropdown'},
                      {text: 'One more separated link', parent: 'Dropdown'}
                  ]
              }
            &quot;
        &gt;&lt;/ul&gt;
        &lt;form class=&quot;navbar-search pull-left&quot; action=&quot;&quot;&gt;
          &lt;input type=&quot;text&quot; class=&quot;search-query span2&quot; placeholder=&quot;Search&quot;&gt;
        &lt;/form&gt;
        &lt;ul class=&quot;pull-right&quot;
            data-dojo-type=&quot;havok/widget/NavBarLinks&quot;
            data-dojo-props=&quot;
              active: 'Home',
              store: {
                  idProperty: 'text',
                  data: [
                      {text: 'Link'},
                      {type: 'divider', text: 'divider1'},
                      {type: 'dropdown', text: 'Dropdown'},
                      {text: 'Action', parent: 'Dropdown'},
                      {text: 'Another action', parent: 'Dropdown'},
                      {text: 'Something else here', parent: 'Dropdown'},
                      {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                      {text: 'Separated link', parent: 'Dropdown'}
                  ]
              }
            &quot;
        &gt;&lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>

<hr class="bs-docs-separator">


<h2>Inverted variation</h2>
<p>Modify the look of the navbar by adding <code>.navbar-inverse</code>.</p>

<div class="bs-docs-example">
  <div data-dojo-type="havok/widget/NavBar" class="navbar-inverse">
      <div class="container">
        <a data-dojo-attach-point="toggleNode">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a class="brand" href="#">Title</a>
        <div data-dojo-attach-point="toggleTarget">
          <ul data-dojo-type="havok/widget/NavBarLinks"
              data-dojo-props="
                active: 'Home',
                store: {
                    idProperty: 'text',
                    data: [
                        {text: 'Home'},
                        {text: 'Link 1'},
                        {text: 'Link 2'},
                        {type: 'dropdown', text: 'Dropdown'},
                        {text: 'Action', parent: 'Dropdown'},
                        {text: 'Another action', parent: 'Dropdown'},
                        {text: 'Something else here', parent: 'Dropdown'},
                        {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                        {type: 'nav-header', text: 'Nav header', parent: 'Dropdown'},
                        {text: 'Separated link', parent: 'Dropdown'},
                        {text: 'One more separated link', parent: 'Dropdown'}
                    ]
                }
              "
          ></ul>
          <form class="navbar-search pull-left" action="">
            <input type="text" class="search-query span2" placeholder="Search">
          </form>
          <ul class="pull-right"
              data-dojo-type="havok/widget/NavBarLinks"
              data-dojo-props="
                active: 'Home',
                store: {
                    idProperty: 'text',
                    data: [
                        {text: 'Link'},
                        {type: 'divider', text: 'divider1'},
                        {type: 'dropdown', text: 'Dropdown'},
                        {text: 'Action', parent: 'Dropdown'},
                        {text: 'Another action', parent: 'Dropdown'},
                        {text: 'Something else here', parent: 'Dropdown'},
                        {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                        {text: 'Separated link', parent: 'Dropdown'}
                    ]
                }
              "
          ></ul>
        </div>
      </div>
  </div>
</div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type="havok/widget/NavBar" class="navbar-inverse"&gt;
...
&lt;/div&gt;
</pre>
        </section>