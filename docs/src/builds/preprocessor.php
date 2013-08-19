
        <section id="preprocessor" title="Preprocessor">
          <div class="page-header">
            <h1>Preprocessor</h1>
          </div>

          <p>Havok inculdes a build profile preprocessor. The preprocessor will modify your build profile so havok's build features work.</p>

          <p>It will add havok build time plugin resolvers to your profile.</p>

          <p>It will merge your dojo config (including the shared di config) into your profile, so that config merge doesn't happen at run time.</p>

          <p>It will change the <code>writeAMD</code> transform to support compiling less for you layers.</p>

          <p>To run the preprocessor use:</p>

          <code>node havok/build/buildconfig.js load=havok/build/preprocess --profile path/to/your.profile.js</code>

          <p>The preprocessor will output a new modified profile called <code>your.profile.preprocessed.js</code></p>
          
          </section>
