<!-- Subhead
================================================== -->
<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>Dependency Injection</h1>
    <p class="lead">Your gateway to loosely coupled and flexible code.</p>
  </div>
</header>


  <div class="container">

    <!-- Docs nav
    ================================================== -->
    <div class="row">
      <div class="span3 bs-docs-sidebar">
        <ul data-dojo-type="havok/widget/NavList"
            data-dojo-mixins="havok/widget/_AffixMixin, havok/widget/_ScrollSpyMixin"
            data-dojo-props="
               linkTemplate: '&lt;a role=&quot;navitem&quot; href=&quot;${href}&quot;&gt;&lt;i class=&quot;icon-chevron-right&quot;&gt;&lt;/i&gt; ${text}&lt;/a&gt;',
               viewportOffset: {top: 40, bottom: 0},
               affixTarget: 'mainContent',
               spyTarget: 'mainContent'
            "
            class="nav-stacked bs-docs-sidenav"
        >
        </ul>
      </div>
    <div class="span9" id="mainContent">

        <?php
        include 'di/overview.php';
        include 'di/config-format.php';
        include 'di/base.php';
        include 'di/params.php';
        include 'di/gets.php';
        include 'di/proxies.php';
        include 'di/directives.php';
        include 'di/injecting-arrays.php';
        include 'di/proxy-objects.php';
        include 'di/plugins.php';
        include 'di/build.php';
        ?>
      </div>
    </div>

  </div>
