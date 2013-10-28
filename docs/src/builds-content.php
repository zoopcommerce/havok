<!-- Subhead
================================================== -->
<header class="jumbotron subhead">
  <div class="container">
    <h1>Builds</h1>
    <p class="lead">Make your production code small and fast</p>
  </div>
</header>


  <div class="container">

    <!-- Docs nav
    ================================================== -->
    <div class="row">
      <?php include 'side-nav.php';?>

    <div class="span9" id="mainContent">

        <?php
        include 'builds/overview.php';
        include 'builds/build-config.php';
        include 'builds/profile.php';
        include 'builds/preprocessor.php';
        include 'builds/build.php';
        include 'builds/deploy.php';
        ?>
      </div>
    </div>

  </div>
