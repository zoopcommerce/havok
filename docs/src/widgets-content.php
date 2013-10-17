<!-- Subhead
================================================== -->
<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>Widgets</h1>
    <p class="lead">Dozens of reusable widgets built to provide navigation, alerts, text editing, and more.</p>
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
        include 'widgets/using-widgets.php';
        include 'widgets/stores.php';
        include 'widgets/dropdowns.php';
        include 'widgets/dropdown-toggle.php';
        include 'widgets/buttons.php';
        include 'widgets/navs.php';
        include 'widgets/tabs.php';
        include 'widgets/navbar.php';
        include 'widgets/sortable.php';
        include 'widgets/affix.php';
        include 'widgets/scrollspy.php';
        include 'widgets/accordion.php';
        include 'widgets/modals.php';
        include 'widgets/tooltips.php';
        include 'widgets/alerts.php';
        include 'widgets/overlay.php';
        include 'widgets/dragable.php';
        include 'widgets/carousel.php';
        include 'widgets/text-editor.php';
        ?>
      </div>
    </div>

  </div>
