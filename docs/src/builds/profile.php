
        <section id="profile" title="Profile">
          <div class="page-header">
            <h1>Profile</h1>
          </div>

          <p>A build profile is a js file that describes which packages will be built, which modules should be in any layers, and <i>lots</i> of other switches that can be used to tailor your layer for a specific runtime environment.</p>

          <p>The most important aspect of defining a build profile is the layers. Each layer defines a single compressed js file with the included modules and their dependencies along with a compressed css file of all the less for that layer.</p>

          <p>Look in the <code>havok/build/profile</code> directory. There you will find a heavily commented example profile, as well as the profile used to create the havok.js distributable.</p>

          <p>You can build the example profile by executing <code>sh build-example.sh</code> in the <code>havok/build</code> directory.</p>
        </section>
