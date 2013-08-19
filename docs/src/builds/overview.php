
        <section id="overview" title="Overview">
          <div class="page-header">
            <h1>Overview</h1>
          </div>

          <p>Havok uses dojo's AMD loader to load modules, and has a handy ability to compile less client side. This makes development, unit testing and code reuse easy. However, it makes sites slow. An average havok page might load over 60 separate javascript files, and compile 15 less files. All those requests take too long for a production environment.</p>

          <p>Havok can utilize the dojo build system to create layers. Each layer consists of three parts:</p>

          <ul>
              <li>A single compressed javascript file containing many AMD modules</li>
              <li>Locale modules that contain translations for the layer</li>
              <li>A compressed css file that contains all the compiled less for the layer</li>
          </ul>

          <p>To build havok layers you will require:
          <ul>
              <li>node.js installed</li>
              <li>a buildconfig.js that sets up the build environment</li>
              <li>a profile.js that describes what should be built</li>
          </ul>

          <p>Furthermore, the havok build process has two parts:</p>
          <ul>
              <li>build profile preprocess</li>
              <li>the actual build</li>
          </ul>

        </section>
