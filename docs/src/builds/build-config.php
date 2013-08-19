
        <section id="build-config" title="Build Config">
          <div class="page-header">
            <h1>Build Config</h1>
          </div>

          <p>A <code>buildconfig.js</code> sets up dojo to run in the node.js environment. It must describe all the packages that will be used during the build.</p>

          <p>If you are only building havok with none of your own custom modules, then you can use <code>havok/build/buildconfig.js</code> as is.</p>

          <p>If you have other packages, or your own custom modules you wish to include in your build, then copy <code>havok/build/buildconfig.js</code> and add your extra packages to the <code>packages</code> array.</p>

        </section>
