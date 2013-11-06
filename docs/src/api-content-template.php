<!-- Subhead
================================================== -->
<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>API</h1>
    <p class="lead">API documentation for all havok modules and their dependencies.</p>
  </div>
</header>


  <div class="container">

    <!-- Docs nav
    ================================================== -->
    <div class="row">
      <div class="span3 bs-docs-sidebar">
        <script>
            require(['dojo/store/Memory', 'get!havok/store/manager'], function(Memory, storeManager){
                storeManager.stores.apiTree = new Memory();
            })
        </script>

      </div>
    <div class="span9" id="mainContent">
        <h1><?php echo $module['location'];?></h1>
      </div>
    </div>

  </div>
