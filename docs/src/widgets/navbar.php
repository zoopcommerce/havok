<section id="navbar" title="Navbar">
  <div class="page-header">
    <h1>Navbar</h1>
  </div>

<h2>Basic navbar</h2>
<p>To start, navbars are static (not fixed to the top) and include support for a project name and basic navigation. Place one anywhere within a <code>.container</code>, which sets the width of your site and content.</p>

<div class="bs-docs-example">
  <nav-bar>
      <a class="brand">Title</a>
      <nav-bar-links>
          <a class="active">Home</a>
        <a>Link</a>
        <a>Link</a>
      </nav-bar-links>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<hr class="bs-docs-separator">

<h2>Navbar components</h2>

<h3>Brand</h3>
<p>A simple link to show your brand or project name only requires an anchor tag.</p>
<div class="bs-docs-example">
  <nav-bar>
    <a class="brand" href="#">Title</a>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Nav links</h3>
<p>Nav items are simple to add via <code>havok/widget/NavBarLinks</code> widget.</p>
<div class="bs-docs-example">
  <nav-bar>
      <nav-bar-links>
        <a class="active">Home</a>
        <a>Link</a>
        <a>Link</a>
      </nav-bar-links>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<p>You can easily add dividers to your nav links with an empty list item and a simple class. Just use the <code>hr</code> tag.</p>
<div class="bs-docs-example">
  <nav-bar>
      <nav-bar-links>
        <a class="active">Home</a>
        <hr />
        <a>Link</a>
        <hr />
        <a>Link</a>
      </nav-bar-links>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Forms</h3>
<p>To properly style and position a form within the navbar, add the appropriate classes as shown below. For a default form, include <code>.navbar-form</code> and either <code>.pull-left</code> or <code>.pull-right</code> to properly align it.</p>
<div class="bs-docs-example">
  <nav-bar>
      <form class="navbar-form pull-left">
        <input type="text" class="span2">
        <button type="submit" class="btn">Submit</button>
      </form>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Search form</h3>
<p>For a more customized search form, add <code>.navbar-search</code> to the <code>form</code> and <code>.search-query</code> to the input for specialized styles in the navbar.</p>
<div class="bs-docs-example">
  <nav-bar>
      <form class="navbar-search pull-left">
        <input type="text" class="search-query" placeholder="Search">
      </form>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Component alignment</h3>
<p>Align nav links, search form, or text, use the <code>.pull-left</code> or <code>.pull-right</code> utility classes. Both classes will add a CSS float in the specified direction.</p>

<h3>Using dropdowns</h3>
<p>Use <code>havok/widget/DropdownToggle</code> and <code>havok/widget/Dropdown</code> inside a links list.</p>
<div class="bs-docs-example">
  <nav-bar>
      <nav-bar-links>
        <a class="active">Home</a>
        <dropdown-toggle>
            <a>Dropdown <span class="caret"></span></a>
            <dropdown>
                <a>Item 1</a>
                <a>Item 2</a>
            </dropdown>
        </dropdown-toggle>
      </nav-bar-links>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Text</h3>
<p>Wrap strings of text in an element with <code>.navbar-text</code>, usually on a <code>&lt;p&gt;</code> tag for proper leading and color.</p>


<hr class="bs-docs-separator">


<h2>Optional display variations</h2>
<p>Fix the navbar to the top or bottom of the viewport with an additional class on the outermost div, <code>.navbar</code>.</p>

<h3>Fixed to top</h3>
<p>Add <code>.navbar-fixed-top</code> and remember to account for the hidden area underneath it by adding at least 40px <code>padding</code> to the <code>&lt;body&gt;</code>. Be sure to add this after the core Bootstrap CSS and before the optional responsive CSS.</p>
<div class="bs-docs-example bs-navbar-top-example">
  <nav-bar class="navbar-fixed-top" style="position: absolute;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="">Title</a>
        <ul class="nav">
          <li class="active"><a href="">Home</a></li>
          <li><a href="">Link</a></li>
          <li><a href="">Link</a></li>
        </ul>
      </div>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Fixed to bottom</h3>
<p>Add <code>.navbar-fixed-bottom</code> instead.</p>
<div class="bs-docs-example bs-navbar-bottom-example">
  <nav-bar class="navbar-fixed-bottom" style="position: absolute;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="#">Title</a>
        <ul class="nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
    </div>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<h3>Static top navbar</h3>
<p>Create a full-width navbar that scrolls away with the page by adding <code>.navbar-static-top</code>. Unlike the <code>.navbar-fixed-top</code> class, you do not need to change any padding on the <code>body</code>.</p>
<div class="bs-docs-example bs-navbar-top-example">
  <nav-bar class="navbar-static-top" style="margin: -1px -1px 0;">
      <div class="container" style="width: auto; padding: 0 20px;">
        <a class="brand" href="#">Title</a>
        <ul class="nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
      </div>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>


<hr class="bs-docs-separator">

<h2>Responsive navbar</h2>
<p>To implement a collapsing responsive navbar, wrap your navbar content in a containing div, and use <code>data-dojo-attach-point="toggleNode"</code> with <code>data-dojo-attach-point="toggleTarget"</code></p>

<div class="bs-docs-example">
  <nav-bar>
    <a nav-bar-toggle>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </a>
    <a class="brand" href="">Title</a>
    <div nav-bar-toggle-target>
        <nav-bar-links>
          <a class="active" href="">Home</a>
          <a href="">Link 1</a>
          <a href="">Link 2</a>
          <dropdown-toggle>
              <a href="">Dropdown <span class="caret"></span></a>
              <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <li class="nav-header">Nav Header</li>
                  <a href="">Separated link</a>
                  <a href="">One more separated link</a>
              </dropdown>
          </dropdown-toggle>
        </nav-bar-links>
      <form class="navbar-search pull-left" action="">
        <input type="text" class="search-query span2" placeholder="Search">
      </form>
        <nav-bar-links class="pull-right">
          <a href="">Link</a>
          <hr />
          <dropdown-toggle>
              <a href="">Dropdown <span class="caret"></span></a>
              <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <a href="">Separated link</a>
              </dropdown>
          </dropdown-toggle>
        </nav-bar-links>
    </div>
  </nav-bar>
</div>
<pre class="prettyprint linenums">

</pre>

<hr class="bs-docs-separator">


<h2>Inverted variation</h2>
<p>Modify the look of the navbar by adding <code>.navbar-inverse</code>.</p>

<div class="bs-docs-example">
  <nav-bar class="navbar-inverse">
    <a nav-bar-toggle>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </a>
    <a class="brand" href="">Title</a>
    <div nav-bar-toggle-target>
        <nav-bar-links>
          <a class="active" href="">Home</a>
          <a href="">Link 1</a>
          <a href="">Link 2</a>
          <dropdown-toggle>
              <a href="">Dropdown <span class="caret"></span></a>
              <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <li class="nav-header">Nav Header</li>
                  <a href="">Separated link</a>
                  <a href="">One more separated link</a>
              </dropdown>
          </dropdown-toggle>
        </nav-bar-links>
      <form class="navbar-search pull-left" action="">
        <input type="text" class="search-query span2" placeholder="Search">
      </form>
        <nav-bar-links class="pull-right">
          <a href="">Link</a>
          <hr />
          <dropdown-toggle>
              <a href="">Dropdown <span class="caret"></span></a>
              <dropdown>
                  <a href="">Action</a>
                  <a href="">Another action</a>
                  <a href="">Something else here</a>
                  <hr />
                  <a href="">Separated link</a>
              </dropdown>
          </dropdown-toggle>
        </nav-bar-links>
    </div>
  </nav-bar>    
</div>

<pre class="prettyprint linenums">

</pre>

        </section>