<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Havok · Zoop</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Tim Roediger">

    <link href="js/google-code-prettify/prettify.css" rel="stylesheet">

    <!-- Placed at the start of the document so require is available for examples -->
    <script type="text/javascript">
        dojoConfig = {
            isDebug: true,
            locale: 'en-au',
            async: true,
            merge: [
                'havok/config',
                'havokdocs/config'
            ],
            di: {
                'havokdocs/Controller': {
                    params: {
                        type: 'php'
                    }
                }
            },
            packages: [
                {
                    name: "havokdocs",
                    location: "../havok/docs/module"
                }
            ]
        }
    </script>
    <script src="../../../dojo/dojo.js"></script>
    <script type="text/javascript">
        require([
            'havok/main',
            'havok/exception/started!',
            'havok/router/started!',
            'havok/parseComplete!'
        ], function(){})
    </script>
  </head>

  <body onload="prettyPrint()">

    <!-- Navbar
    ================================================== -->
  <div class="navbar-inverse navbar-fixed-top" data-dojo-type="havok/widget/NavBar">
      <div class="container">
        <a data-dojo-attach-point="toggleNode">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a class="brand" href="./index.html">Havok</a>
        <div data-dojo-attach-point="toggleTarget">
            <ul data-dojo-type="havok/widget/NavBarLinks">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="getting-started.html">Get started</a>
              </li>
              <li>
                <a href="widgets.html">Widgets</a>
              </li>
              <li>
                <a href="forms.html">Forms</a>
              </li>
              <li>
                <a href="data-quality.html">Data Quality</a>
              </li>
              <li>
                <a href="services.html">Services</a>
              </li>
              <li>
                <a href="di.html">DI</a>
              </li>
            </ul>
        </div>
      </div>
  </div>

    <div id="contentWrapper" style="min-height: 400px">
    <?php echo $content;?>
    </div>
    <div id="contentWrapperOverlay" data-dojo-type="havok/widget/Overlay" data-dojo-props="target: document.body">Loading more havok...</div>

    <!-- Footer
    ================================================== -->
    <footer class="footer">
      <div class="container">
        <p>Created by <a href="http://github.com/superdweebie">@superdweebie</a> and <a href="http://github.com/crimsonronin">@crimsonronin</a>.</p>
        <p>Code licensed under MIT.</p>
        <p>Built on the shoulders of giants <a href="http://twitter.github.io/bootstrap">bootstrap</a> and <a href="http://dojotoolkit.org">dojo</a>.</p>
        <ul class="footer-links">
          <li><a href="http://zoopcommerce.com">Zoop</a></li>
          <li class="muted">&middot;</li>
          <li><a href="https://github.com/zoopcommerce/havok/issues?state=open">Issues</a></li>
          <li class="muted">&middot;</li>
          <li><a href="https://github.com/zoopcommerce/havok/blob/master/CHANGELOG.md">Changelog</a></li>
        </ul>
      </div>
    </footer>

    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/google-code-prettify/prettify.js"></script>
  </body>
</html>
