<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Havok · Zoop</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Tim Roediger">

    <link href="js/google-code-prettify/prettify.css" rel="stylesheet">

    <!--Must be placed in head for layout and parser to work in ie8 -->
    <!--[if lt IE 9]>
        <script src="../../../havok/parser/ie8shim.js"></script>
    <![endif]-->

    <?php
    if (isset($build) && $build == 'dist'){
    ?>
    <link rel="stylesheet" href="havokdocs.css">

    <!-- Placed at the start of the document so require is available for examples -->
    <script src="js/havokdocs.js"></script>
    <?php
    } else {
    ?>
    <!-- Placed at the start of the document so require is available for examples -->
    <script type="text/javascript">
        dojoConfig = {
            isDebug: true,
            selectorEngine: "lite",
            locale: 'en-au',
            async: true,
            merge: [
                'havok/config',
                'havok/docs/module/config'
            ],
            di: {
                'havok/docs/module/Controller': {
                    params: {
                        type: 'php'
                    }
                }
            }
        }
    </script>
    <script src="../../../dojo/dojo.js"></script>
    <?php
    }
    ?>
    <script type="text/javascript">require(['havok/bootstrap!'], function(){})</script>
  </head>

  <body id="docBody" onload="prettyPrint()">


  <nav-bar class="navbar-inverse navbar-fixed-top">
      <div class="container">
        <a data-dojo-attach-point="toggleNode">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a class="brand" href="./index.html">Havok</a>
        <div data-dojo-attach-point="toggleTarget">
            <nav-bar-links>
                <a href="index.html">Home</a>
                <a href="getting-started.html">Get started</a>
                <a href="widgets.html">Widgets</a>
                <a href="forms.html">Forms</a>
                <a href="data-quality.html">Data Quality</a>
                <a href="services.html">Services</a>
                <a href="di.html">DI</a>
                <a href="builds.html">Builds</a>
            </nav-bar-links>
        </div>
      </div>
  </nav-bar>

    <div id="contentWrapper" style="min-height: 1000px">
    <?php echo $content;?>
    </div>
    <overlay id="contentWrapperOverlay" target="docBody">Loading more havok...</overlay>

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
