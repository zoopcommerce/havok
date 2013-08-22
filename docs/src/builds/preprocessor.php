
        <section id="preprocessor" title="Preprocessor">
          <div class="page-header">
            <h1>Preprocessor</h1>
          </div>

          <p>Havok inculdes a build profile preprocessor. The preprocessor takes much of the hard work out of creating a working build profile.</p>

          <p>It will merge your profile with the default build settings in <code>havok/build/defaultProfile</code>. These settings are tuned for browser deployment. They will work for most, but advanced users or alternative runtime environments might require different settings.</p>

          <p>It will merge your dojo config (including the shared di config) into your profile, so that config merge doesn't happen at run time.</p>

          <p>To run the preprocessor use:</p>

          <code>node havok/build/buildconfig.js load=havok/build/preprocess --profile path/to/your.profile.js</code>

          <p>The preprocessor will output a new modified profile called <code>your.profile.preprocessed.js</code></p>

          </section>
