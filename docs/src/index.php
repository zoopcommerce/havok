<?php ob_start()?>

<div class="jumbotron masthead">
  <div class="container">
    <h1>Havok</h1>
    <p>Elegance and power. Front end javascript tools for today.</p>
    <p>
      <a href="https://github.com/zoopcommerce/havok/zipball/master" class="btn btn-primary btn-large">Download Havok</a>
    </p>
    <ul class="masthead-links">
      <li>
        <a href="http://github.com/zoopcommerce/havok">GitHub project</a>
      </li>
      <li>
        <a href="./getting-started.html#examples">Examples</a>
      </li>
      <li>
        Version 1.0
      </li>
    </ul>
  </div>
</div>

<div class="bs-docs-social">
  <div class="container">
    <ul class="bs-docs-social-buttons">
      <li>
        <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=zoopcommerce&repo=havok&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>
      </li>
      <li>
        <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=zoopcommerce&repo=havok&type=fork&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="102px" height="20px"></iframe>
      </li>
    </ul>
  </div>
</div>
<br />
<div class="container">

  <div class="marketing">

    <div class="row-fluid">
      <div class="span12 hero-unit">
        <h3>Introducing Havok</h3>
		
        <div class="lead">The elegance of Bootstrap styles</div>
		<p>Havok uses bootstrap less style sheets, and will work with all standard bootstrap markup. It lets you create good looking sites fast.</p>
		
        <div class="lead">The power of dojo and AMD</div>
		<p>Havok uses dojo and the javascript AMD modules for fantastic code organisation and reuse. Leave jQuery for something better.</p>
		
		<h1>Havok</h1>
		<h3>Build sites that feel great for both users and developers.</h3>
      </div>
    </div>
	
    <div class="row-fluid">
      <div class="span4">
        <h2>Built by <a href="http://zoopcommerce.com">Zoop</a></h2>
        <p>Built at Zoop by <a href="http://github.com/superdweebie">@superdweebie</a> and <a href="http://github.com/crimsonronin">@crimsonronin</a> on the shoulders of giants. The styles from <a href="http://twitter.github.io/bootstrap/">bootstrap</a>, with javascript from <a href="http://dojotoolkit.org">dojo</a>. Validators from <a href="http://zoopcommerce.github.io/mystique">Mystique</a>. Source managed through <a href="http://github.com">GitHub</a>.</p>
      </div>
      <div class="span4">
        <h2>Packed with features</h2>
        <p>Over two dozen widgets including text editor, color picker, form validators and lots more.</p>
      </div>
      <div class="span4">
        <h2>Great foundation</h2>
        <p>Awesome building blocks including config merging, dependency injection, data store management, and simple build tools.</p>
      </div>
    </div>

    <div class="row-fluid">
      <div class="span12 hero-unit masthead">
          <a href="./getting-started.html" class="btn btn-primary btn-large">Lets get started ...</a>
      </div>
    </div>
</div>
</div>

<?php
$content = ob_get_clean();
include 'layout.php';
?>
